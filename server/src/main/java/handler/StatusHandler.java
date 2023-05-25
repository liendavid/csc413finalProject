package handler;

import dao.ConversationDao;
import dao.MessageDao;
import dao.UserDao;
import dto.ConversationDto;
import dto.MessageDto;
import handler.AuthFilter.AuthResult;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
import org.bson.Document;
import request.ParsedRequest;
import response.CustomHttpResponse;
import response.HttpResponseBuilder;
import response.RestApiAppResponse;

public class StatusHandler implements BaseHandler{

    @Override
    public HttpResponseBuilder handleRequest(ParsedRequest request) {
        var authResult = AuthFilter.doFilter(request);
        String message = "";
        System.out.println("==========");
        System.out.println(request.getBody());
        if (!authResult.isLoggedIn){
            return new HttpResponseBuilder().setStatus(StatusCodes.UNAUTHORIZED)
                    .setBody("User not online");
        } else {
            message = "User" + authResult.userName + " is online";
        }

        var res = new RestApiAppResponse<>(true, null, message);
        return new HttpResponseBuilder().setStatus("200 OK").setBody(res);

    }
}
