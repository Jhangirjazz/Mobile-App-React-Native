import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    topbar: {
        backgroundColor: "#195F94",
        paddingVertical: 22
    },
    topbarText: {
        color: "white",
        fontSize: 22,
        textAlign: "center",
        fontWeight: "800",
    },
    container: {
        flexDirection: 'row',
        height: 80,
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    logoContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    logo: {
        width: 60,
        height: 80,
    },
    titleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#195f94',
    },
    menuContainer: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    menuButton: {
        padding: 10,
    },
    menuLine: {
        width: 25,
        height: 3,
        backgroundColor: '#333',
        marginVertical: 3,
        borderRadius: 1,
    },
    menuModal: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    menuContent: {
        width: '70%',
        height: '100%',
        backgroundColor: '#fff',
        alignSelf: 'flex-end',
        padding: 20,
    },
    closeButton: {
        alignSelf: 'flex-end',
        padding: 10,
    },
    closeButtonText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    menuItem: {
        fontSize: 18,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    
});

export default styles