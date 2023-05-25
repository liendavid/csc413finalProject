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
        var authResult = AuthFilter.doFilter(request);
        if (!authResult.isLoggedIn) {
            return new HttpResponseBuilder().setStatus(StatusCodes.UNAUTHORIZED)
                    .setBody("User not online");
        }
        StatusDto userDto = GsonTool.gson.fromJson(request.getBody(), dto.StatusDto.class);
        userDto.getUserName();
        String status = userDto.getStatus();

        // error handling
        if (status == null || status.isEmpty()) {
            return new HttpResponseBuilder().setStatus(StatusCodes.BAD_REQUEST)
                    .setBody("Status cannot be empty");
        }

        // update the user's status in the database
        var statusDto = new StatusDto();
        statusDto.setUserName(authResult.userName);
        statusDto.setStatus(status);
        StatusDao.getInstance().put(statusDto);

        var message = "User " + authResult.userName + " status updated to " + status;
        var res = new RestApiAppResponse<>(true, null, message);
        return new HttpResponseBuilder().setStatus(StatusCodes.OK).setBody(res);
    }
}
