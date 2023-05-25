package handler;
 
import dao.UserDao;
import dto.UserDto;
import handler.AuthFilter.AuthResult;
import org.bson.Document;
import request.ParsedRequest;
import response.HttpResponseBuilder;
import response.RestApiAppResponse;
  
  public class SetProfilePictureHandler implements BaseHandler{
  
 
  @Override
  public HttpResponseBuilder handleRequest(ParsedRequest request) {
    UserDto userDto = GsonTool.gson.fromJson(request.getBody(), dto.UserDto.class);
    UserDao userDao = UserDao.getInstance();
    var query = new Document("userName", userDto.getUserName());
    AuthResult authResult = AuthFilter.doFilter(request);
    if(!authResult.isLoggedIn){
      return new HttpResponseBuilder().setStatus(StatusCodes.UNAUTHORIZED);
    }
    if (userDao.query(query) != null) {
      userDto.setProfilePicture(userDto.getProfilePicture());
      userDao.updateProfilePicture(userDto);
      var res = new RestApiAppResponse<>(false, null,"Updating Profile Picture");
      return new HttpResponseBuilder().setStatus("200 OK").setBody(res);
    }
 
    var filter = new Document("userName", authResult.userName);
    var res = new RestApiAppResponse<>(true, userDao.query(filter), null);
    return new HttpResponseBuilder().setStatus("200 OK").setBody(res);
  }
}