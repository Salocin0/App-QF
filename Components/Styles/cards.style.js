import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  card: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 3,
  },
  title: {
    marginBottom: 20,
    fontSize:20,
  },
  input: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 5,
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
    alignSelf:"center"
  },
  cardBody: {
    alignItems: "center",
    width:"100%"
  },
  hr: {
    borderBottomWidth: 1,
    borderBottomColor: "white",
    width: "100%",
    marginVertical: 10,
  },
  buttonGroup: {
    alignItems: "center",
    width:"100%"
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
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
  btnSelect:{
    marginVertical: 5,
  },
  btnActive: {
    backgroundColor: "blue",
  },
});

export default styles;
