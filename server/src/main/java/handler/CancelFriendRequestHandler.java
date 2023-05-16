package handler;

import dao.FriendRequestDao;
import dto.FriendRequestDto;
import org.bson.Document;
import request.ParsedRequest;
import response.HttpResponseBuilder;
import response.RestApiAppResponse;

import java.util.List;

/**
 * Removes an existing friend request
 */
public class CancelFriendRequestHandler implements BaseHandler  {
    @Override
    public HttpResponseBuilder handleRequest(ParsedRequest request) {
        FriendRequestDto friendRequestDto = GsonTool.gson.fromJson(request.getBody(),
                dto.FriendRequestDto.class);
        
        // only logged in users can cancel friend requests
        AuthFilter.AuthResult authResult = AuthFilter.doFilter(request);
        if(!authResult.isLoggedIn){
            return new HttpResponseBuilder().setStatus(StatusCodes.UNAUTHORIZED);
        }
        String fromUsername = authResult.userName;
        friendRequestDto.setFromUsername(fromUsername);
               
        // check if such a request exists
        Document checkExistingDocument = new Document();
        checkExistingDocument.put("fromUsername", friendRequestDto.getFromUsername());
        checkExistingDocument.put("toUsername", friendRequestDto.getToUsername());

        FriendRequestDao friendRequestDao = FriendRequestDao.getInstance();
        if (friendRequestDao.query(checkExistingDocument).isEmpty())  {
            var res = new RestApiAppResponse<>(false, null,
                    "Can't cancel a friend request that doesn't exist!");
            return new HttpResponseBuilder().setStatus("200 OK").setBody(res);
        }
        
        // the request exists, delete it
        friendRequestDao.delete(checkExistingDocument);
        var res = new RestApiAppResponse<>(true, List.of(friendRequestDto), null);
        return new HttpResponseBuilder().setStatus("200 OK").setBody(res);
    }
}