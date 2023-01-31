import { Image, StyleSheet, Text, View } from "react-native";
import { MenuItem } from "../pages/Home";

interface Props {
    item: MenuItem;
}

export function MenuItemCard({ item }: Props) {
    return (
        <View style={styles.container}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.textContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.price}>${item.price}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#eaeaea",
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginRight: 10,
    },
    textContainer: {
        flex: 1,
        marginLeft: 10,
    },
    name: {
        fontSize: 16,
        fontFamily: "Karla-Regular",
        marginBottom: 5,
    },
    description: {
        fontSize: 14,
        fontFamily: "Karla-Regular",
        marginBottom: 5,
    },
    price: {
        fontSize: 14,
        fontFamily: "Karla-Regular",
        color: "#495e57",
    },
});
