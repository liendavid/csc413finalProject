package dto;

import org.bson.Document;

import java.time.Instant;

public class FriendshipDto extends BaseDto  {
    private String firstFriendUsername;
    private String secondFriendUsername;
    
    private Long timestamp;
    
    public FriendshipDto()  {
        timestamp = Instant.now().toEpochMilli();
    }

    public FriendshipDto(String uniqueId)  {
        super(uniqueId);
        timestamp = Instant.now().toEpochMilli();
    }
    
    
    @Override
    public Document toDocument() {
        return new Document()
                .append("firstFriendUsername", firstFriendUsername)
                .append("secondFriendUsername", secondFriendUsername)
                .append("timestamp", timestamp);
    }
    
    public static FriendshipDto fromDocument(Document document)  {
        FriendshipDto friendship = new FriendshipDto();

        friendship.setFirstFriendUsername(document.getString("firstFriendUsername"));
        friendship.setSecondFriendUsername(document.getString("secondFriendUsername"));
        friendship.setTimestamp(document.getLong("timestamp"));
        
        return friendship;
    }

    // getters
    
    public String getFirstFriendUsername() {
        return firstFriendUsername;
    }

    public String getSecondFriendUsername() {
        return secondFriendUsername;
    }

    public Long getTimestamp() {
        return timestamp;
    }

    // setters
    
    public void setFirstFriendUsername(String firstFriendUsername) {
        this.firstFriendUsername = firstFriendUsername;
    }

    public void setSecondFriendUsername(String secondFriendUsername) {
        this.secondFriendUsername = secondFriendUsername;
    }

    public void setTimestamp(Long timestamp) {
        this.timestamp = timestamp;
    }
}