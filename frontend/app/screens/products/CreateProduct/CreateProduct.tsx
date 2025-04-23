import React, {useState} from "react";
import {Alert, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, View} from "react-native";
import {TextInput, Button, Text} from "react-native-paper";
import customAPI from "@/app/services/apiClient";
import styles from "@/app/screens/products/CreateProduct/CreateProduct.style";
import {RouteProp, useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "@/app/navigation/Navigation";
import { Dropdown } from 'react-native-element-dropdown';
import { useTranslation } from 'react-i18next';


type ProductCreateProps = RouteProp<RootStackParamList, "createproduct">;

interface ProductCreate {
    route: ProductCreateProps;
}

const CreateProduct = ({ route }: ProductCreate) => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState<number | "">("");
    const [productType, setProductType] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState("");
    const { cafe } = route.params;
    const { t } = useTranslation();

    const data = [
        { label: 'PROMO', value: 'PROMO' },
        { label: 'DRINKS', value: 'DRINKS' },
        { label: 'EATING', value: 'EATING' },
    ];

    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

    const handleCreateProduct = async () => {
        setFormErrors({});
        setApiError("");

        const errors: { [key: string]: string } = {};

        if (!name) errors.name = "Name is required.";
        if (!price) errors.price = "Price is required.";
        if (!productType) errors.productType = "Product type is required.";
        if (!imageUrl) errors.imageUrl = "Image URL is required.";

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        const Product = {
            name,
            price: Number(price),
            productType,
            imageUrl,
            cafeteriaId: cafe.id,
        };

        setLoading(true);
        try {
            const response = await customAPI.post("/api/products", Product);
            if (response.status !== 201) {
                throw new Error(response.data?.message || "Error creating product");
            }
            setName("");
            setPrice("");
            setProductType("");
            setImageUrl("");
            Alert.alert("Product created successfully");
            navigation.goBack();
        } catch (err: any) {
            setApiError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const [isFocus, setIsFocus] = useState(false);

    return (
        <ImageBackground
            source={{uri: "https://iili.io/3IoPfjI.jpg"}}
            style={styles.backgroundImage}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
            >
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.formContainer}>
                        <Text style={styles.title}>{t("create-product")}</Text>
                        {apiError ? <Text style={styles.errorText}>{apiError}</Text> : null}

                        <TextInput
                            label={t("name")}
                            value={name}
                            onChangeText={(text) => {
                                setName(text);
                                setFormErrors((prev) => ({...prev, name: ""}));
                            }}
                            mode="outlined"
                            style={styles.input}
                        />
                        {formErrors.name && (
                            <Text style={styles.errorText}>{formErrors.name}</Text>
                        )}
                        <TextInput
                            label={t("price")}
                            value={price.toString()}
                            onChangeText={(text) => {
                                const numeric = text.replace(/[^0-9.]/g, "");
                                setPrice(numeric === "" ? "" : Number(numeric));
                                setFormErrors(prev => ({ ...prev, price: "" }));
                            }}
                            keyboardType="numeric"
                            mode="outlined"
                            style={styles.input}
                        />
                        {formErrors.price && (
                            <Text style={styles.errorText}>{formErrors.price}</Text>
                        )}
                        <Dropdown
                            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={data}
                            search
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder={!isFocus ? t("select-product") : '...'}
                            searchPlaceholder="Search..."
                            value={productType}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={item => {
                                setProductType(item.value);
                                setFormErrors(prev => ({ ...prev, productType: "" }));
                                setIsFocus(false);
                            }}
                        />
                        {formErrors.productType && (
                            <Text style={styles.errorText}>{formErrors.productType}</Text>
                        )}
                        <TextInput
                            label={t("url-photo")}
                            value={imageUrl}
                            onChangeText={(text) => {
                                setImageUrl(text);
                                setFormErrors((prev) => ({...prev, imageUrl: ""}));
                            }}
                            mode="outlined"
                            style={styles.input}
                        />
                        {formErrors.imageUrl && (
                            <Text style={styles.errorText}>{formErrors.imageUrl}</Text>
                        )}
                        <Button
                            mode="contained"
                            onPress={handleCreateProduct}
                            loading={loading}
                            disabled={loading}
                            style={styles.createButton}
                        >
                            {loading ? "Creating..." : t("create-button")}
                        </Button>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </ImageBackground>
    );
};


export default CreateProduct;
