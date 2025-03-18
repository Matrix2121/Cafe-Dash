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
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    borderRadius: 20,
    elevation: 10,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  registerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(142,129,129,0.4)',
    width: 340,
    height: 400,
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
  },
  input: {
    width: 300,
    marginBottom: 10,
    marginHorizontal: 30,
    backgroundColor: '#CECECC',
    borderColor: '#774936',
  },
  registerButton: {
    marginTop: 30,
    width: 200,
    backgroundColor: '#774936',
  },
  loginButton: {
    marginTop: 10,
    width: 200,
    borderColor: '#774936',
    borderWidth: 2,
    backgroundColor: '#CECECC',
  },
  highlight: {
    color: "#774936",
    fontWeight: "bold",
  },
  errorText: {
    color: '#774936',
    marginBottom: 10,
  },
});
