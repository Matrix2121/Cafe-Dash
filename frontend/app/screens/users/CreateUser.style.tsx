import { StyleSheet } from "react-native";

export default StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'stretch',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  registerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(142,129,129,0.4)',
    width: 340,
    height: 440,
    borderRadius: 20,
    margin: 0,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: "white",
    borderBottomColor: '#CECECC',
    borderBottomWidth: 3,
    padding: 5,
    textAlign: 'center',
  },
  input: {
    width: 300,
    marginBottom: 10,
    marginHorizontal: 30,
    backgroundColor: '#CECECC',
    borderColor: '#444444',
    color: '#774936',
  },
  registerButton: {
    width: 200,
    backgroundColor: '#444444',
  },
  loginButton: {
    marginTop: 10,
    width: 200,
    borderColor: '#444444',
    borderWidth: 2,
    backgroundColor: '#CECECC',
  },
  highlight: {
    color: "#444444",
    fontWeight: "bold",
  },
  errorText: {
    color: '#444444',
    marginBottom: 10,
  },

  // New or updated styles for role selection
  selectRolesContainer: {
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  selectRolesLabel: {
    textAlign: 'center',
    color: '#774936',
    marginBottom: 5,
    fontSize: 16,
    fontWeight: '600',
  },
  roleButtonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  roleButton: {
    margin: 4,
    borderColor: 'black',
    borderWidth: 1,
  },
  selectedRoleButton: {
    backgroundColor: '#333333', // dark gray
  },
  roleButtonText: {
    color: 'black',
  },
  selectedRoleButtonText: {
    color: 'white',
  },
});
