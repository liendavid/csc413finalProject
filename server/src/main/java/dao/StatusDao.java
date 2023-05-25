package dao;

import com.mongodb.client.MongoCollection;
import dto.StatusDto;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import org.bson.Document;

public class StatusDao extends BaseDao<StatusDto> {

    private static StatusDao instance;

    private StatusDao(MongoCollection<Document> collection) {
        super(collection);
    }

    public static StatusDao getInstance() {
        if (instance != null) {
            return instance;
        }
        instance = new StatusDao(MongoConnection.getCollection("StatusDao"));
        return instance;
    }

    public static StatusDao getInstance(MongoCollection<Document> collection) {
        instance = new StatusDao(collection);
        return instance;
    }

    @Override
    public void put(StatusDto statusDto) {
        collection.insertOne(statusDto.toDocument());
    }

    @Override
    public List<StatusDto> query(Document filter) {
        return collection.find(filter)
                .into(new ArrayList<>())
                .stream()
                .map(StatusDto::fromDocument)
                .collect(Collectors.toList());
    }
}