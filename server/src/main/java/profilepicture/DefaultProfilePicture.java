package profilepicture;
 
import java.util.Random;
 
public class DefaultProfilePicture {
 
    public static String getRandomColor(){
        String value;
        Random rand = new Random();
        int random = rand.nextInt(3);
        switch(random){
            case 0:
                value = "/images/blue.png";
                break;
            case 1:
                value = "/images/pink.png";
                break;
            case 2:
                value = "/images/green.png";
                break;
            default:
                value = "/images/yellow.png";
        }
        return value;
    }

}
