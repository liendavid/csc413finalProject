package dto;

import org.bson.Document;
import java.time.Instant;

public class FriendRequestDto extends BaseDto {
    private String fromUsername;
    private String toUsername;
    private Boolean isAccepted;
    private Boolean isDenied;
    private Long timestamp;


    public FriendRequestDto()  {
        timestamp = Instant.now().toEpochMilli();
        isAccepted = false;
        isDenied = false;
    }
    
    public FriendRequestDto(String uniqueId)  {
        super(uniqueId);
        timestamp = Instant.now().toEpochMilli();
        isAccepted = false;
        isDenied = false;
    }
    
    @Override
    public Document toDocument() {
        return new Document()
                .append("fromUsername", fromUsername)
                .append("toUsername", toUsername)
                .append("isAccepted", isAccepted)
                .append("isDenied", isDenied)
                .append("timestamp", timestamp);
    }
    
    public static FriendRequestDto fromDocument(Document document) {
        FriendRequestDto friendRequest = new FriendRequestDto();
        
        friendRequest.setFromUsername(document.getString("fromUsername"));
        friendRequest.setToUsername(document.getString("toUsername"));
        friendRequest.setIsAccepted(document.getBoolean("isAccepted"));
        friendRequest.setIsDenied(document.getBoolean("isDenied"));
        friendRequest.setTimestamp(document.getLong("timestamp"));

        return friendRequest;
    }
    
    // getters
    
    public String getFromUsername() {
        return fromUsername;
    }

    public String getToUsername() {
        return toUsername;
    }

    public Long getTimestamp() {
        return timestamp;
    }

    public Boolean getIsAccepted() {
        return isAccepted;
    }

    public Boolean getIsDenied() {
        return isDenied;
    }

    // setters
    
    public void setFromUsername(String fromUsername) {
        this.fromUsername = fromUsername;
    }

    public void setToUsername(String toUsername) {
        this.toUsername = toUsername;
    }

    public void setTimestamp(Long timestamp) {
        this.timestamp = timestamp;
    }

    public void setIsAccepted(Boolean accepted) {
        isAccepted = accepted;
    }

    public void setIsDenied(Boolean denied) {
        isDenied = denied;
    }
}