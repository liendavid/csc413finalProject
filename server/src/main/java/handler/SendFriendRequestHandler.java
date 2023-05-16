package handler;

import dao.FriendRequestDao;
import dao.UserDao;
import dto.FriendRequestDto;
import org.bson.Document;
import request.ParsedRequest;
import response.HttpResponseBuilder;
import response.RestApiAppResponse;

import java.util.List;

public class SendFriendRequestHandler implements BaseHandler {
    @Override
    public HttpResponseBuilder handleRequest(ParsedRequest request) {
        FriendRequestDto friendRequestDto = GsonTool.gson.fromJson(request.getBody(), 
                dto.FriendRequestDto.class);

        // only logged in users can send friend requests
        AuthFilter.AuthResult authResult = AuthFilter.doFilter(request);
        if(!authResult.isLoggedIn){
            return new HttpResponseBuilder().setStatus(StatusCodes.UNAUTHORIZED);
        }
        String fromUsername = authResult.userName;
        friendRequestDto.setFromUsername(fromUsername);

        // check if both users exist
        UserDao userDao = UserDao.getInstance();
        if (!usernameExists(friendRequestDto.getFromUsername(), userDao)) {
            var res = new RestApiAppResponse<>(false, null,
                    "Unknown user can't send a Friend Request!");
            return new HttpResponseBuilder().setStatus("200 OK").setBody(res);
        } else if (!usernameExists(friendRequestDto.getToUsername(), userDao))  {
            var res = new RestApiAppResponse<>(false, null,
                    "Sending Friend Request to unknown user!");
            return new HttpResponseBuilder().setStatus("200 OK").setBody(res);
        }
        
        // check if an outgoing friend requests already exists
        FriendRequestDao friendRequestDao = FriendRequestDao.getInstance();

        Document checkExistingDocument = new Document();
        checkExistingDocument.put("fromUsername", friendRequestDto.getFromUsername());
        checkExistingDocument.put("toUsername", friendRequestDto.getToUsername());
        
        // this user has already sent the friend request to the same user
        
        // it includes accepted and denied requests
        if (!friendRequestDao.query(checkExistingDocument).isEmpty())  {
            var res = new RestApiAppResponse<>(false, null,
                    "Can't send a duplicate Friend Request!");
            return new HttpResponseBuilder().setStatus("200 OK").setBody(res);
        }
        
        // check if there is already an incoming request from the toUsername to fromUsername
        checkExistingDocument = new Document();
        checkExistingDocument.put("fromUsername", friendRequestDto.getToUsername());
        checkExistingDocument.put("toUsername", friendRequestDto.getFromUsername());
        if (!friendRequestDao.query(checkExistingDocument).isEmpty())  {
            var res = new RestApiAppResponse<>(false, null,
                    friendRequestDto.getToUsername() + " already wants to be friends! " +
                            "You should accept their request!");
            return new HttpResponseBuilder().setStatus("200 OK").setBody(res);
        }
        
        // save the friend request in a database
        friendRequestDao.put(friendRequestDto);

        var res = new RestApiAppResponse<>(true, List.of(friendRequestDto), null);
        return new HttpResponseBuilder().setStatus("200 OK").setBody(res);
    }
    
    private boolean usernameExists(String username, UserDao userDao)  {
        return !userDao.query(new Document("userName", username)).isEmpty(); 
    }
}