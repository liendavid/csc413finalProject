package handler;

import dao.ChannelDao;
import dto.ChannelDto;
import dto.MessageDto;
import request.ParsedRequest;
import response.HttpResponseBuilder;
import response.RestApiAppResponse;

import java.util.List;

public class SendChannelMessage implements BaseHandler{
    @Override
    public HttpResponseBuilder handleRequest(ParsedRequest request) {
        // Debug output
        System.out.println("Send Channel:\n" + request.getBody());
        // Get channel objects
        ChannelDto channelDto = GsonTool.gson.fromJson(request.getBody(), ChannelDto.class);
        ChannelDao channelDao = ChannelDao.getInstance();

        // Verify Logged in
        AuthFilter.AuthResult authResult = AuthFilter.doFilter(request);
        if(!authResult.isLoggedIn){
            return new HttpResponseBuilder().setStatus(StatusCodes.UNAUTHORIZED);
        }
        System.out.println(">>> CH UN <<<" + authResult.userName);
        channelDto.setFromId(authResult.userName);

        // Add channel message to DB
        channelDao.put(channelDto);

        // Return success response
        return new HttpResponseBuilder()
                .setStatus("200 OK")
                .setBody(new RestApiAppResponse(true, null, null));
    }
}
