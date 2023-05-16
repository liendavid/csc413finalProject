package dao;

import com.mongodb.client.MongoCollection;
import dto.FriendshipDto;
import org.bson.Document;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class FriendshipDao extends BaseDao<FriendshipDto>  {
    private static FriendshipDao instance;
    
    public static FriendshipDao getInstance()  {
        if (instance != null)  {
            return instance;
        }
        
        instance = new FriendshipDao(MongoConnection.getCollection("FriendshipDao"));
        return instance;
    }
    
    public static FriendshipDao getInstance(MongoCollection<Document> collection)  {
        instance = new FriendshipDao(collection);
        return instance;
    }
    
    public FriendshipDao(MongoCollection<Document> collection)  {
        super(collection);
    }

    @Override
    public void put(FriendshipDto friendshipDto) {
        collection.insertOne(friendshipDto.toDocument());
    }

    @Override
    public List<FriendshipDto> query(Document filter) {
        return collection.find(filter)
                .into(new ArrayList<>())
                .stream()
                .map(FriendshipDto::fromDocument)
                .collect(Collectors.toList());
    }
}