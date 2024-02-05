import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  containerCard: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 5,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  card: {
    width: "85%",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    elevation: 3,
  },
  title: {
    fontSize: 18,
  },
  input: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 3,
  },
  label: {
    color: "black",
    fontWeight: "normal",
  },
  button: {
    backgroundColor: "#3498db",
    borderRadius: 5,
    marginHorizontal: 10,
    alignSelf: "flex-end",
    width: "33%",
  },
  buttonForm: {
    backgroundColor: "#3498db",
    borderRadius: 5,
    padding: 10,
    alignSelf: "flex-end",
    color: "white",
  },
  buttonEndForm: {
    backgroundColor: "#198754",
    borderRadius: 5,
    padding: 10,
    alignSelf: "flex-end",
    color: "white",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  link: {
    color: "#3498db",
  },
  ViewButtom: {
    width: "100%",
  },
  cardheader: {
    marginBottom: 10,
    alignSelf: "center",
  },
  cardBody: {
    alignItems: "center",
    width: "100%",
  },
  hr: {
    borderBottomWidth: 1,
    borderBottomColor: "white",
    width: "100%",
    marginVertical: 2,
  },
  buttonGroup: {
    alignItems: "center",
    width: "100%",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  clearButton: {
    backgroundColor: "lightgray",
    padding: 10,
    borderRadius: 5,
  },
  nextButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
  disabledButton: {
    backgroundColor: "gray",
  },
  btnSelect: {
    marginVertical: 5,
    backgroundColor: "orange",
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    borderRadius: 5,
  },
  btnActive: {
    marginVertical: 5,
    backgroundColor: "chocolate",
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    borderRadius: 5,
  },
  textinput: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 5,
    color: "black",
    fontWeight: "normal",
    width: "100%",
  },
  textInputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  toggleButton: {
    marginLeft: -25,
    marginBottom: 5,
  }
});

export default styles;
