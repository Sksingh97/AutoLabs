import React, { useContext } from 'react';
import { ScrollView, Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { ThemeContext } from '../../../provider/theme';
import { LeftArrow } from '../../../constants/images';
import Header from '../../../components/header';

const PrivacyPolicy = ({navigation}:any) => {
    const { colors } = useContext(ThemeContext)
    const styles = getStyles(colors)
    const renderBack =() =>{
        return (
            <TouchableOpacity onPress={()=>{navigation.popToTop();}}>
                <LeftArrow width={25} height={25} fill={colors.Text} stroke={colors.Text} />
            </TouchableOpacity>
        )
    }
  return (
    <View style={styles.mainContainer}>
        <Header LeftIcons={[renderBack]}/>
        <ScrollView style={styles.container}>
        <View style={styles.content}>
            <Text style={styles.title}>Privacy Policy</Text>
            <Text style={styles.date}>Effective Date: 01/01/2017</Text>

            <Text style={styles.sectionTitle}>1. Introduction</Text>
            <Text style={styles.sectionText}>
            Welcome to AutoLabs. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our application. By using our app, you agree to the collection and use of information in accordance with this policy.
            </Text>

            <Text style={styles.sectionTitle}>2. Information We Collect</Text>
            <Text style={styles.sectionText}>
            We may collect the following types of information:
            {'\n'}• Personal Information: Such as name, email address, phone number, etc.
            {'\n'}• Usage Data: Information on how you use our app, including your interactions and preferences.
            {'\n'}• Device Information: Details about your device, including its operating system and unique identifiers.
            </Text>

            <Text style={styles.sectionTitle}>3. How We Use Your Information</Text>
            <Text style={styles.sectionText}>
            We use the collected information to:
            {'\n'}• Provide and maintain our app.
            {'\n'}• Improve and personalize your experience.
            {'\n'}• Communicate with you, including sending updates and support messages.
            {'\n'}• Analyze usage and trends to enhance our services.
            </Text>

            <Text style={styles.sectionTitle}>4. Sharing Your Information</Text>
            <Text style={styles.sectionText}>
            We may share your information with:
            {'\n'}• Service Providers: Third-party vendors who assist us in operating our app and providing services.
            {'\n'}• Legal Requirements: When required to comply with legal obligations or to protect our rights.
            {'\n'}• Business Transfers: In connection with a merger, acquisition, or sale of assets.
            </Text>

            <Text style={styles.sectionTitle}>5. Security of Your Information</Text>
            <Text style={styles.sectionText}>
            We implement reasonable security measures to protect your information. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </Text>

            <Text style={styles.sectionTitle}>6. Your Rights</Text>
            <Text style={styles.sectionText}>
            Depending on your location, you may have rights regarding your personal information, such as the right to access, correct, or delete your data. Please contact us to exercise these rights.
            </Text>

            <Text style={styles.sectionTitle}>7. Changes to This Privacy Policy</Text>
            <Text style={styles.sectionText}>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
            </Text>

            <Text style={styles.sectionTitle}>8. Contact Us</Text>
            <Text style={styles.sectionText}>
            If you have any questions about this Privacy Policy, please contact us at:
            {'\n'}AutoLabs
            {'\n'}E-7, Sector 2
            {'\n'}care@autolabs.com
            {'\n'}+91 123456789
            </Text>
        </View>
        </ScrollView>
    </View>
  );
};

const getStyles = (colors:any) => StyleSheet.create({
    mainContainer:{
        backgroundColor: colors.Primary,
        height: '100%',
        width: '100%',
        paddingHorizontal: 10
    },
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: colors.Primary,
    },
    content: {
        marginVertical: 8,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
        color: colors.Text
    },
    date: {
        fontSize: 14,
        fontStyle: 'italic',
        marginBottom: 16,
        textAlign: 'center',
        color: colors.Text
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: colors.Text,
        textAlign: 'justify'
    },
    sectionText: {
        fontSize: 16,
        marginBottom: 16,
        lineHeight: 24,
        color: colors.Text,
        textAlign: 'justify'
    },
});

export default PrivacyPolicy;