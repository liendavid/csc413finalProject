package handler;

import request.ParsedRequest;
import response.HttpResponseBuilder;

/**
 * Unfriends a given user.
 * 
 * If the logged in user was the one to send the friend request,
 * the friend request is canceled.
 * 
 * If the logged in user was the one to accept the friend request,
 * the isAccepted field in the friend request gets set to false.
 */
public class UnfriendHandler  implements BaseHandler  {
    @Override
    public HttpResponseBuilder handleRequest(ParsedRequest request) {
        return null;
    }
}