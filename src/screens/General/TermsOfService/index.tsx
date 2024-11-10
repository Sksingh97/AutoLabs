import {View, Text, StyleSheet, Image, TouchableOpacity } from "react-native"
import Header from "../../../components/header"
import { useContext } from "react"
import { ThemeContext } from "../../../provider/theme"
import { LeftArrow } from "../../../constants/images"
import { ScrollView } from "react-native-gesture-handler"
import fontSize from "../../../constants/fontSize"

const TermOfService = ({navigation}:any) => {
    const { colors } = useContext(ThemeContext)
    const styles = getStyle(colors)
    const renderBack =() =>{
        return (
            <TouchableOpacity onPress={()=>{navigation.popToTop();}}>
                <LeftArrow width={25} height={25} fill={colors.Text} stroke={colors.Text} />
            </TouchableOpacity>
        )
    }
    return (
        <View style={styles.container}>
            <Header LeftIcons={[renderBack]}/>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <Text style={styles.title}>Terms of Use</Text>
        <Text style={styles.date}>Effective Date: 01/01/2017</Text>

        <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
        <Text style={styles.sectionText}>
          By accessing or using the AutoLabs app, you acknowledge that you have read, understood, and agree to be bound by these Terms, as well as any additional guidelines, rules, or terms that may apply.
        </Text>

        <Text style={styles.sectionTitle}>2. Changes to Terms</Text>
        <Text style={styles.sectionText}>
          We may modify these Terms at any time. Changes will be effective immediately upon posting on this page. Your continued use of the app following the posting of changes constitutes your acceptance of such changes.
        </Text>

        <Text style={styles.sectionTitle}>3. User Eligibility</Text>
        <Text style={styles.sectionText}>
          To use our app, you must be at least 18 years old or the age of majority in your jurisdiction. By using the app, you represent and warrant that you meet these requirements.
        </Text>

        <Text style={styles.sectionTitle}>4. Account Registration and Security</Text>
        <Text style={styles.sectionText}>
          To access certain features of the app, you may be required to create an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete. You are responsible for safeguarding your account credentials and for any activity that occurs under your account. You agree to notify us immediately of any unauthorized use of your account.
        </Text>

        <Text style={styles.sectionTitle}>5. Use of the App</Text>
        <Text style={styles.sectionText}>
          You agree to use the app only for lawful purposes and in accordance with these Terms. You agree not to:
          {'\n'}• Use the app in any way that could disable, overburden, or impair the app's functionality.
          {'\n'}• Attempt to gain unauthorized access to the app or its related systems or networks.
          {'\n'}• Engage in any activity that interferes with or disrupts the app or its servers.
        </Text>

        <Text style={styles.sectionTitle}>6. Privacy Policy</Text>
        <Text style={styles.sectionText}>
          Your use of the app is also governed by our Privacy Policy, which describes how we collect, use, and disclose information about you. By using the app, you consent to our collection, use, and disclosure of your information in accordance with the Privacy Policy.
        </Text>

        <Text style={styles.sectionTitle}>7. Intellectual Property</Text>
        <Text style={styles.sectionText}>
          The app and its content, including but not limited to text, graphics, logos, images, and software, are the property of Auto Labs or its licensors and are protected by copyright, trademark, and other intellectual property laws. You may not use, reproduce, distribute, or create derivative works from any content on the app without our express written permission.
        </Text>

        <Text style={styles.sectionTitle}>8. Third-Party Links</Text>
        <Text style={styles.sectionText}>
          The app may contain links to third-party websites or services that are not owned or controlled by Auto Labs. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites or services. You acknowledge and agree that we are not responsible or liable, directly or indirectly, for any damage or loss caused by or in connection with the use of any such content, goods, or services available on or through any third-party websites or services.
        </Text>

        <Text style={styles.sectionTitle}>9. Disclaimers</Text>
        <Text style={styles.sectionText}>
          The app is provided on an "as is" and "as available" basis. To the fullest extent permitted by law, Auto Labs disclaims all warranties, express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement. We do not warrant that the app will be uninterrupted, error-free, or free of viruses or other harmful components.
        </Text>

        <Text style={styles.sectionTitle}>10. Limitation of Liability</Text>
        <Text style={styles.sectionText}>
          In no event shall Auto Labs be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from (a) your use or inability to use the app; (b) any unauthorized access to or use of our servers and/or any personal information stored therein; or (c) any other matter related to the app.
        </Text>

        <Text style={styles.sectionTitle}>11. Indemnification</Text>
        <Text style={styles.sectionText}>
          You agree to indemnify, defend, and hold harmless Auto Labs and its officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, or expenses, including reasonable attorneys' fees, arising out of or related to (a) your use of the app; (b) any violation of these Terms by you; or (c) any content you submit through the app.
        </Text>

        <Text style={styles.sectionTitle}>12. Termination</Text>
        <Text style={styles.sectionText}>
          We reserve the right to terminate or suspend your account and access to the app at our sole discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.
        </Text>

        <Text style={styles.sectionTitle}>13. Governing Law</Text>
        <Text style={styles.sectionText}>
          These Terms shall be governed by and construed in accordance with the laws of Uttar Pradesh, without regard to its conflict of law principles. Any disputes arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts located in Greater Noida, Uttar Pradesh, India.
        </Text>

        <Text style={styles.sectionTitle}>14. Contact Us</Text>
        <Text style={styles.sectionText}>
          If you have any questions about these Terms, please contact us at:
          {'\n'}AutoLabs
          {'\n'}E-7, Sector 2
          {'\n'}care@autolabs.com
          {'\n'}+91 123456789
        </Text>

        <Text style={styles.sectionTitle}>15. Entire Agreement</Text>
        <Text style={styles.sectionText}>
          These Terms constitute the entire agreement between you and Auto Labs regarding your use of the app and supersede all prior agreements and understandings, whether written or oral, relating to the app.
        </Text>
      </View>
    </ScrollView>
            
        </View>
    )
}

const getStyle = (colors:any) => StyleSheet.create({
    container:{
        backgroundColor: colors.Primary,
        height: '100%',
        width: '100%',
        paddingHorizontal: 10
    },
    scrollContainer:{
        height: '100%',
        backgroundColor: colors.Primary
    },
    titleContainer:{
        height:50,
        width:'100%',
        alignItems: 'center',
        flexDirection:'row',
    },
    image: {
        height:40,
        width:40
    },
    title:{
        marginLeft: '18%',
        fontSize: fontSize.H1,
        color: colors.Text
    },
    contentContainer: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
      },
      content: {
        marginVertical: 8,
      },
      contentTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
      },
      date: {
        fontSize: 14,
        fontStyle: 'italic',
        marginBottom: 16,
        textAlign: 'center',
      },
      sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: colors.Text
      },
      sectionText: {
        fontSize: 16,
        marginBottom: 16,
        lineHeight: 24,
        textAlign:'justify',
        color: colors.Text
      },
})

export default TermOfService;