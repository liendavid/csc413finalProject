package handler;

import request.ParsedRequest;

public class HandlerFactory {
  // routes based on the path. Add your custom handlers here
  public static BaseHandler getHandler(ParsedRequest request) {
    switch (request.getPath()) {
      case "/createUser":
        return new CreateUserHandler();
      case "/login":
        return new LoginHandler();
      case "/getConversations":
        return new GetConversationsHandler();
      case "/getConversation":
        return new GetConversationHandler();
      case "/createMessage":
        return new CreateMessageHandler();
        
      // Friends Feature Start
      
      case "/getFriends":
        return new GetFriendsHandler();
      case "/unfriend":
        return null;
        
      case "/sendFriendRequest":
        return new SendFriendRequestHandler();
      case "/cancelFriendRequest":
        return new CancelFriendRequestHandler();

      case "/acceptFriendRequest":
        return new AcceptFriendRequestHandler();
      case "/denyFriendRequest":
        return new DenyFriendRequestHandler();
        
      case "/getIncomingFriendRequests":
        return new GetIncomingFriendRequests();
      case "/getOutgoingFriendRequests":
        return new GetOutgoingFriendRequests();
        
      case "/getUsernameByHash":
        return new GetUsernameByHash();
        
      // Friends Feature End

      case "/getProfilePicture":
        return new GetProfilePictureHandler();
      case "/setProfilePicture":
        return new SetProfilePictureHandler();
        
      default:
        return new FallbackHandler();
    }
  }
}