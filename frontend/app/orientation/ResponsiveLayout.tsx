import React, { ReactNode, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import {OrientationContext} from "@/app/orientation/OrientationContext";

type Props = {
    children: ReactNode;
};

export const ResponsiveLayout = ({ children }: Props) => {
    const orientation = useContext(OrientationContext);

    return (
        <View style={orientation === 'LANDSCAPE' ? styles.landscape : styles.portrait}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    portrait: {
        flex: 1,
    },
    landscape: {
        flex: 1,
        flexDirection: 'row',
    },
});