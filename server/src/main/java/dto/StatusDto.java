package dto;

import org.bson.Document;

public class StatusDto extends BaseDto {
    private String userName;
    private String status;

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getUserName() {
        return userName;
    }

    public String getStatus() {
        return status;
    }

    @Override
    public Document toDocument() {
        var doc = new Document();
        doc.append("userName", userName);
        doc.append("status", status);
        return doc;
    }

    public static StatusDto fromDocument(Document document) {
        var statusDto = new StatusDto();
        statusDto.setUserName(document.getString("userName"));
        statusDto.setStatus(document.getString("status"));
        return statusDto;
    }
}
