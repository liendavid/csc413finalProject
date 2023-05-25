package handler;

import dao.StatusDao;
import dto.StatusDto;
import dto.UserDto;
import handler.AuthFilter.AuthResult;
import request.ParsedRequest;
import response.HttpResponseBuilder;
import response.RestApiAppResponse;

public class StatusHandler implements BaseHandler {

    @Override
    public HttpResponseBuilder handleRequest(ParsedRequest request) {
        // check if user is logged in return error if not online
        var authResult = AuthFilter.doFilter(request);
        if (!authResult.isLoggedIn) {
            var res = new RestApiAppResponse<>(false, null, "User not online");
            return new HttpResponseBuilder().setStatus(StatusCodes.UNAUTHORIZED)
                    .setBody(res);
        }
        // parse the request, so we can get the username and status
        StatusDto userDto = GsonTool.gson.fromJson(request.getBody(), dto.StatusDto.class);
        String username = userDto.getUserName();
        String status = userDto.getStatus();

        // update the user's status in the database
        var statusDto = new StatusDto();
        statusDto.setUserName(username);
        statusDto.setStatus(status);
        StatusDao.getInstance().put(statusDto);

        var message = "User " + username + " status updated to " + status;
        var res = new RestApiAppResponse<>(true, null, message);
        return new HttpResponseBuilder().setStatus(StatusCodes.OK).setBody(res);
    }
}
