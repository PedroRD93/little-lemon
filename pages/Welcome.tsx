import React from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import PagerView from "react-native-pager-view";
import { FormButton } from "../components/FormButton";
import { FormInput } from "../components/FormInput";
import { useAuth } from "../hooks/useAuth";
import { isEmailValid, isNameValid } from "../validators/auth";

export function Welcome() {
    const [name, setName] = React.useState("");
    const [lastname, setLastname] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [presentPage, setPresentPage] = React.useState(1);

    const { singIn } = useAuth();

    const handleSignIn = () => {
        singIn({
            name,
            lastname,
            email,
        });
    };

    const PagerViewRef = React.useRef<any>(null);

    const goToPage = React.useCallback((page: number) => {
        if (PagerViewRef.current) PagerViewRef.current.setPage(page);
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
            <PagerView
                style={styles.pagerView}
                initialPage={0}
                scrollEnabled={false}
                ref={PagerViewRef}
                onPageSelected={(e) => {
                    setPresentPage(e.nativeEvent.position);
                }}
            >
                <View key="1" style={styles.page}>
                    <Text style={styles.title}>Let us get to know you</Text>
                    <FormInput placeholder="Name" value={name} onChange={setName} autoCapitalize="words" label="Name" />
                    <View style={styles.separator}></View>
                    <View style={styles.buttonContainer}>
                        <FormButton
                            title="Next"
                            disabled={!isNameValid(name)}
                            onPress={() => {
                                goToPage(1);
                            }}
                        />
                    </View>
                </View>
                <View key="2" style={styles.page}>
                    <Text style={styles.title}>Let us get to know you</Text>
                    <FormInput placeholder="Last Name" value={lastname} onChange={setLastname} autoCapitalize="words" label={"Last Name"} />
                    <View style={styles.separator}></View>
                    <View style={styles.buttonContainer}>
                        <FormButton
                            title="Next"
                            disabled={!isNameValid(lastname)}
                            onPress={() => {
                                goToPage(2);
                            }}
                        />
                    </View>
                </View>
                <View key="3" style={styles.page}>
                    <Text style={styles.title}>Let us get to know you</Text>
                    <FormInput label="Email" placeholder="Type your email" value={email} onChange={setEmail} />
                    <View style={styles.separator}></View>
                    <View style={styles.buttonContainer}>
                        <FormButton
                            title="Next"
                            disabled={!isEmailValid(email)}
                            onPress={() => {
                                handleSignIn();
                            }}
                        />
                    </View>
                </View>
            </PagerView>
            <View style={styles.bottomContainer}>
                <View style={styles.indicatorContainer}>
                    <View>
                        <Text style={{ ...styles.indicators, color: presentPage == 0 ? "#495e57" : "#bdbdbd" }}>•</Text>
                    </View>
                    <View>
                        <Text style={{ ...styles.indicators, color: presentPage == 1 ? "#495e57" : "#bdbdbd" }}>•</Text>
                    </View>
                    <View>
                        <Text style={{ ...styles.indicators, color: presentPage == 2 ? "#495e57" : "#bdbdbd" }}>•</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    pagerView: {
        flex: 1,
    },
    page: {
        justifyContent: "center",
        padding: 20,
    },
    separator: {
        marginVertical: 10,
        height: 1,
        width: "80%",
    },
    indicators: {
        width: 30,
        textAlign: "center",
        fontSize: 45,
    },
    indicatorContainer: {
        flexDirection: "row",
    },
    bottomContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
    },
    title: {
        fontSize: 20,
        color: "#495e57",
        textAlign: "center",
        marginBottom: 30,
        fontFamily: "Karla-Regular",
    },
    buttonContainer: {
        marginBottom: 90,
    },
});
