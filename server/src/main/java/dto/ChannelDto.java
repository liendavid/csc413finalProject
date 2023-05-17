package dto;

import dao.BaseDao;
import java.time.Instant;
import org.bson.Document;
import java.time.Instant;

public class ChannelDto extends BaseDto {
    // Local variables for dto
    private String fromId;
    private String channelId;
    private String message;
    private long timestamp;

    // Constructors
    public ChannelDto(){
        timestamp = Instant.now().toEpochMilli();
    }
    public ChannelDto(String uniqueId){
        super(uniqueId);
        timestamp = Instant.now().toEpochMilli();
    }

    // Convert dto to document
    public Document toDocument(){
        return new Document()
                .append("fromId", fromId)
                .append("channelId", channelId)
                .append("message", message)
                .append("timestamp", timestamp);
    }

    // Get dto form document
    public static ChannelDto fromDocument(Document document){
        var channel = new ChannelDto();
        channel.fromId = document.getString("fromId");
        channel.channelId = document.getString("channelId");
        channel.message = document.getString("message");
        channel.timestamp = document.getLong("timestamp");
        return channel;
    }

    // fromId get/set
    public String getFromId(){return fromId;}
    public void setFromId(String fromId){this.fromId = fromId;}

    // channelID get/set
    public String getChannelId(){return channelId;}
    public void setChannelId(String channelId){this.channelId = channelId;}

    // message get/set
    public String getMessage(){return message;}
    public void setMessage(String message){this.message = message;}

    // Timestamp
    public long getTimestamp(){return timestamp;}
}
