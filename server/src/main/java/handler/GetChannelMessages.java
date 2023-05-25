package handler;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import dao.ChannelDao;
import netscape.javascript.JSObject;
import org.bson.Document;
import request.ParsedRequest;
import response.HttpResponseBuilder;
import response.RestApiAppResponse;

public class GetChannelMessages implements BaseHandler {
    @Override
    public HttpResponseBuilder handleRequest(ParsedRequest request) {


        // Get channel Dao
        ChannelDao channelDao = ChannelDao.getInstance();

        // Verify logic
        AuthFilter.AuthResult authResult = AuthFilter.doFilter(request);
        if(!authResult.isLoggedIn){
            return new HttpResponseBuilder().setStatus(StatusCodes.UNAUTHORIZED);
        }

        // Build query filter from request
        JsonObject json = new Gson().fromJson(request.getBody(), JsonObject.class);
        // Debug output
        System.out.println("Get Channel:\n" + json.get("channelId").getAsString());
        Document filter = new Document("channelId", json.get("channelId").getAsString());


        // Get channel name from request
        var res = new RestApiAppResponse<>(true, channelDao.query(filter), null);
        return new HttpResponseBuilder()
                .setStatus("200 OK")
                .setBody(res);
    }
}
