package handler;

import dao.FriendRequestDao;
import dto.FriendRequestDto;
import org.bson.Document;
import request.ParsedRequest;
import response.HttpResponseBuilder;
import response.RestApiAppResponse;

import java.util.List;

public class GetIncomingFriendRequests implements BaseHandler {
    @Override
    public HttpResponseBuilder handleRequest(ParsedRequest request) {
        // check if the user is logged in
        AuthFilter.AuthResult authResult = AuthFilter.doFilter(request);
        if(!authResult.isLoggedIn){
            return new HttpResponseBuilder().setStatus(StatusCodes.UNAUTHORIZED);
        }
        String toUsername = authResult.userName;

        Document friendRequestToFind = new Document();
        friendRequestToFind.put("toUsername", toUsername);

        FriendRequestDao friendRequestDao = FriendRequestDao.getInstance();
        List<FriendRequestDto> foundFriendRequests = friendRequestDao.query(friendRequestToFind);

        var res = new RestApiAppResponse<>(true, foundFriendRequests, null);
        return new HttpResponseBuilder().setStatus("200 OK").setBody(res);
    }
}