package dao;

import com.mongodb.client.MongoCollection;
import org.bson.Document;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import dto.ChannelDto;

public class ChannelDao extends BaseDao<ChannelDto>{
    // Static instance
    private static ChannelDao instance;

    // Dao constructor
    private ChannelDao(MongoCollection<Document> collection){super(collection);}

    // Get instance from static local var
    public static ChannelDao getInstance(){
        // Return instance if it exists
        if(instance != null) {
            return instance;
        }
        instance = new ChannelDao(MongoConnection.getCollection("ChannelDao"));
        return instance;
    }

    // Add message to db
    public void put(ChannelDto channelMsg){
        collection.insertOne(channelMsg.toDocument());
    }


    // Return results of query channel message dao
    public List<ChannelDto> query(Document filter){
        return collection.find(filter)
                .into(new ArrayList<>())
                .stream()
                .map(ChannelDto::fromDocument)
                .collect(Collectors.toList());
    }
}
