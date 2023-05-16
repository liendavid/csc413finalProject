package handler;

import com.sun.security.jgss.AuthorizationDataEntry;
import dao.AuthDao;
import dto.AuthDto;
import dto.BaseDto;
import dto.FriendRequestDto;
import dto.UserDto;
import org.bson.Document;
import request.ParsedRequest;
import response.HttpResponseBuilder;
import response.RestApiAppResponse;

import java.util.List;

public class GetUsernameByHash  implements BaseHandler  {
    class UsernameDto extends BaseDto  {
        private String username;

        public UsernameDto(String uniqueId, String username) {
            super(uniqueId);
            this.username = username;
        }

        public UsernameDto(String username) {
            this.username = username;
        }

        @Override
        public Document toDocument() {
            return new Document()
                    .append("username", username);
        }

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }
    }
    
    @Override
    public HttpResponseBuilder handleRequest(ParsedRequest request) {
        String hash = request.getQueryParam("hash");
        hash = hash.trim();
        if (hash.endsWith("%0A"))  {
            hash = hash.substring(0, hash.length() - 3);
        }
        
        // only logged in users can view username by hash
        AuthFilter.AuthResult authResult = AuthFilter.doFilter(request);
        if(!authResult.isLoggedIn) {
            return new HttpResponseBuilder().setStatus(StatusCodes.UNAUTHORIZED);
        }
        String loggedInUsername = authResult.userName;
        
        AuthDao authDao = AuthDao.getInstance();
        List<AuthDto> foundAuthDtos = authDao.query(new Document("hash", hash));
        
        if (foundAuthDtos.isEmpty())  {
            var res = new RestApiAppResponse<>(false, null,
                    "Could not find a username for the given hash!");
            return new HttpResponseBuilder().setStatus("200 OK").setBody(res);
        }

        String username = foundAuthDtos.get(0).getUserName();
        // only users who own the hash can view the username
        if (!loggedInUsername.equals(username))  {
            return new HttpResponseBuilder().setStatus(StatusCodes.UNAUTHORIZED);
        }

        var res = new RestApiAppResponse<>(true, List.of(new UserDto(username)), null);
        return new HttpResponseBuilder().setStatus("200 OK").setBody(res);
    }
}