package hackerearth;


import java.awt.Toolkit;
import java.awt.datatransfer.Clipboard;
import java.awt.datatransfer.ClipboardOwner;
import java.awt.datatransfer.StringSelection;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.net.URL;
import java.util.Date;
import javax.swing.JOptionPane;
import org.openide.awt.ActionID;
import org.openide.awt.ActionReference;
import org.openide.awt.ActionReferences;
import org.openide.awt.ActionRegistration;
import org.openide.awt.HtmlBrowser.URLDisplayer;
import org.openide.cookies.EditorCookie;

@ActionID(
        category = "File",
        id = "hackerearth.NewClass"
)

@ActionRegistration(
        displayName = "Send Code To Hackerearth or Codechef or Hackerrank"
)
@ActionReferences(
        {
        @ActionReference(path = "Editors/text/x-java/Popup", position = 1740, separatorBefore = 1730),
        @ActionReference(path = "Editors/text/javascript", position = 1740, separatorBefore = 1730),
        @ActionReference(path = "Editors/text/x-xml/Popup", position = 1740, separatorBefore = 1730)
        }
)


public class NewClass implements ActionListener
{
    private final EditorCookie context;
    String urli="";
    public NewClass(EditorCookie context) {
        this.context = context;
        //JOptionPane.showMessageDialog(null, "i am started now");
    }
    @Override
    public void actionPerformed(ActionEvent e) {
        try {
            String key="id.hc1407066179862.com";
            String contentInp=context.getDocument().getText(0, context.getDocument().getLength());
            String content=java.net.URLEncoder.encode(contentInp, "UTF-8");
            //String url=java.net.URLEncoder.encode(urli, "UTF-8");
//JOptionPane.showConfirmDialog(null, "got the content :"+ct);
            if(context.getDocument().getProperty(key)==null)
            {context.getDocument().putProperty(key, ""+new Date().getTime());
            //JOptionPane.showMessageDialog(null, "not found");
            }
            
            String idi=(String) context.getDocument().getProperty(key);
            String id=java.net.URLEncoder.encode(idi, "UTF-8");
            setClipboardContents(contentInp);
            URLDisplayer.getDefault().showURL
           (new URL("http://www.hc1407066179862.com?ct="+"dummy_content"+"&id="+idi));
            
        } catch (Exception ex) {
            JOptionPane.showMessageDialog(null, ex.toString());
        }
    }
public void setClipboardContents(String aString){
    StringSelection stringSelection = new StringSelection(aString);
    Clipboard clipboard = Toolkit.getDefaultToolkit().getSystemClipboard();
    clipboard.setContents(stringSelection, null);
  }

}