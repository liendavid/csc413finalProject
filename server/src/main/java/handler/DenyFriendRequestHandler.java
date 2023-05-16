package handler;

import dao.FriendRequestDao;
import dto.FriendRequestDto;
import org.bson.Document;
import request.ParsedRequest;
import response.HttpResponseBuilder;
import response.RestApiAppResponse;

import java.util.List;

/**
 * Denies an existing friend requests, 
 * from the specified user to a logged in user.
 */
public class DenyFriendRequestHandler  implements BaseHandler  {
    @Override
    public HttpResponseBuilder handleRequest(ParsedRequest request) {
        // contains fromUsername
        FriendRequestDto friendRequestDto = GsonTool.gson.fromJson(request.getBody(),
                dto.FriendRequestDto.class);

        // only logged in users can cancel friend requests
        AuthFilter.AuthResult authResult = AuthFilter.doFilter(request);
        if(!authResult.isLoggedIn){
            return new HttpResponseBuilder().setStatus(StatusCodes.UNAUTHORIZED);
        }
        // a user can only accept incoming friend requests
        String toUsername = authResult.userName;
        friendRequestDto.setToUsername(toUsername);

        // check if such a request exists
        Document checkExistingDocument = new Document();
        checkExistingDocument.put("fromUsername", friendRequestDto.getFromUsername());
        checkExistingDocument.put("toUsername", friendRequestDto.getToUsername());
        Document oldDocument = checkExistingDocument;

        FriendRequestDao friendRequestDao = FriendRequestDao.getInstance();
        if (friendRequestDao.query(checkExistingDocument).isEmpty())  {
            var res = new RestApiAppResponse<>(false, null,
                    "Can't deny a friend request that doesn't exist!");
            return new HttpResponseBuilder().setStatus("200 OK").setBody(res);
        }

        // check if the request has already been accepted
        Document checkAccepted = new Document();
        checkAccepted.put("fromUsername", friendRequestDto.getFromUsername());
        checkAccepted.put("toUsername", friendRequestDto.getToUsername());
        checkAccepted.put("isDenied", true);
        if (!friendRequestDao.query(checkAccepted).isEmpty())  {
            var res = new RestApiAppResponse<>(false, null,
                    "This friend request has already been denied!");
            return new HttpResponseBuilder().setStatus("200 OK").setBody(res);
        }

        // the request exists, accept it
        Document newDocument = new Document();
        newDocument.put("fromUsername", friendRequestDto.getFromUsername());
        newDocument.put("toUsername", friendRequestDto.getToUsername());
        newDocument.put("isAccepted", false);
        newDocument.put("isDenied", true);

        friendRequestDao.update(oldDocument, newDocument);
        var res = new RestApiAppResponse<>(true, List.of(FriendRequestDto.fromDocument(newDocument)), null);
        return new HttpResponseBuilder().setStatus("200 OK").setBody(res);
    }
}