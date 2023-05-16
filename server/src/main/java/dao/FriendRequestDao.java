package dao;

import com.mongodb.client.MongoCollection;
import dto.FriendRequestDto;
import org.bson.Document;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class FriendRequestDao extends BaseDao<FriendRequestDto> {
    private static FriendRequestDao instance;
    
    public static FriendRequestDao getInstance()  {
        if (instance != null)  {
            return instance;
        }
        
        instance = new FriendRequestDao(MongoConnection.getCollection("FriendRequestDao"));
        return instance;
    }

    public static FriendRequestDao getInstance(MongoCollection<Document> collection)  {
        instance = new FriendRequestDao(collection);
        return instance;
    }
    
    public FriendRequestDao(MongoCollection<Document> collection)  {
        super(collection);
    }

    @Override
    public void put(FriendRequestDto friendRequestDto) {
        collection.insertOne(friendRequestDto.toDocument());
    }

    public void delete(FriendRequestDto friendRequestDto)  {
        collection.deleteOne(friendRequestDto.toDocument());
    }
    
    public void delete(Document document)  {
        collection.deleteOne(document);
    }
    
    public void update(Document oldDocument, Document newDocument)  {
        collection.replaceOne(oldDocument, newDocument);
    }
    
    @Override
    public List<FriendRequestDto> query(Document filter) {
        return collection.find(filter)
                .into(new ArrayList<>())
                .stream()
                .map(FriendRequestDto::fromDocument)
                .collect(Collectors.toList());
    }
}