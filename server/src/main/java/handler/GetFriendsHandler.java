package handler;

import dao.FriendRequestDao;
import dto.FriendRequestDto;
import dto.FriendshipDto;
import org.bson.Document;
import request.ParsedRequest;
import response.HttpResponseBuilder;
import response.RestApiAppResponse;

import java.util.ArrayList;
import java.util.List;

public class GetFriendsHandler implements BaseHandler {
    @Override
    public HttpResponseBuilder handleRequest(ParsedRequest request) {
        // check if the user is logged in
        AuthFilter.AuthResult authResult = AuthFilter.doFilter(request);
        if(!authResult.isLoggedIn){
            return new HttpResponseBuilder().setStatus(StatusCodes.UNAUTHORIZED);
        }
        String loggedInUsername = authResult.userName;
        
        List<FriendRequestDto> outgoingAccepted = getAcceptedOutgoingFriendRequests(loggedInUsername);
        List<FriendRequestDto> incomingAccepted = getAcceptedIncomingFriendRequests(loggedInUsername);

        List<FriendshipDto> friends = new ArrayList<>();
        for (FriendRequestDto friendRequest: outgoingAccepted)  {
            FriendshipDto friendship = new FriendshipDto();
            
            friendship.setFirstFriendUsername(friendRequest.getToUsername());
            friendship.setSecondFriendUsername(friendRequest.getFromUsername());
        
            friends.add(friendship);
        }
        for (FriendRequestDto friendRequest: incomingAccepted)  {
            FriendshipDto friendship = new FriendshipDto();
            friendship.setFirstFriendUsername(friendRequest.getFromUsername());
            friendship.setSecondFriendUsername(friendRequest.getToUsername());

            friends.add(friendship);
        }
        
        var res = new RestApiAppResponse<>(true, friends, null);
        return new HttpResponseBuilder().setStatus("200 OK").setBody(res);
    }
    
    private List<FriendRequestDto> getAcceptedOutgoingFriendRequests(String username)  {
        Document outgoingFriendRequestToFind = new Document();
        outgoingFriendRequestToFind.put("fromUsername", username);
        outgoingFriendRequestToFind.put("isAccepted", true);

        FriendRequestDao friendRequestDao = FriendRequestDao.getInstance();
        List<FriendRequestDto> outgoingFoundFriendRequests = friendRequestDao.query(outgoingFriendRequestToFind);
        
        return outgoingFoundFriendRequests;
    }

    private List<FriendRequestDto> getAcceptedIncomingFriendRequests(String username)  {
        Document incomingFriendRequestToFind = new Document();
        incomingFriendRequestToFind.put("toUsername", username);
        incomingFriendRequestToFind.put("isAccepted", true);

        FriendRequestDao friendRequestDao = FriendRequestDao.getInstance();
        List<FriendRequestDto> incomingFoundFriendRequests = friendRequestDao.query(incomingFriendRequestToFind);

        return incomingFoundFriendRequests;
    }
}