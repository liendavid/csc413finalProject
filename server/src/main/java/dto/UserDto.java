package dto;

import org.bson.Document;

public class UserDto extends BaseDto{

  private String userName;
  private String password;
  private String profilePicture;

  public UserDto() {
    super();
  }

  public UserDto(String uniqueId) {
    super(uniqueId);
  }

  public String getPassword() {
    return password;
  }

  public String getUserName() {
    return userName;
  }

  public String getProfilePicture(){
    return profilePicture;
  }

  public void setUserName(String userName) {
    this.userName = userName;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public void setProfilePicture(String profilePicture){
    this.profilePicture = profilePicture;
  }

  public Document toDocument(){
    return new Document()
        .append("userName", userName)
        .append("password", password)
        .append("profilePicture", profilePicture);
  }

  public static UserDto fromDocument(Document match) {
    var userDto = new UserDto();
    userDto.setUserName(match.getString("userName"));
    userDto.setPassword(match.getString("password"));
    userDto.setProfilePicture(match.getString("profilePicture"));
    return  userDto;
  }
}
