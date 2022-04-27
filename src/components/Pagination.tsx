/**
 * Pagination.tsx
 * Renders the pagination
 */

import React, { FC, } from "react";
import {
    View,
    ViewProps,
    Text
} from "react-native";

//Entities
import CardModel from "../model/CardModel";

//Styling
import styles from '../styles/appStyles';

//Components
import PaginationButton from "./PaginationButton";

//Interface
interface PaginationProps extends ViewProps {
    minPage: number;
    maxPage: number;
    currentPage: number;
    goBackward: Function;
    goFirst: Function;
    goForward: Function;
    goLast: Function;
}

const Pagination: React.FC<PaginationProps> = ({
    minPage,
    maxPage,
    currentPage,
    goBackward,
    goFirst,
    goForward,
    goLast
}) => {
    const backward = "\u003C";
    const forward = "\u003e";
    const dots = ". . .";
    const backEnabled = (currentPage > minPage);
    const forwardEnabled = (currentPage < maxPage);

    const firstPageNumber = (currentPage - minPage) > 1 ? (
        <PaginationButton text={String(minPage)} enabled={true} showBorder={false} onClick={() => goFirst()} />
    ) : (<></>);

    const previousDots = (currentPage - minPage) > 2 ? (
        <PaginationButton text={dots} enabled={false} showBorder={false} />
    ) : (<></>);

    const previousPageNumber = (currentPage - minPage) > 0 ? (
        <PaginationButton text={String(currentPage - 1)} enabled={true} showBorder={false} onClick={() => goBackward()} />
    ) : (<></>);

    const nextPageNumber = (maxPage - currentPage) > 1 ? (
        <PaginationButton text={String(currentPage + 1)} enabled={true} showBorder={false} onClick={() => goForward()} />
    ) : (<></>);

    const nextDots = (maxPage - currentPage) > 2 ? (
        <PaginationButton text={dots} enabled={false} showBorder={false} />
    ) : (<></>);

    const lastPageNumber = (maxPage - currentPage) > 0 ? (
        <PaginationButton text={String(maxPage)} enabled={true} showBorder={false} onClick={() => goLast()} />
    ) : (<></>);

    return (
        <View style={styles.pagination}>
            <PaginationButton text={backward + backward} enabled={backEnabled} onClick={() => goFirst()} />
            <PaginationButton text={backward} enabled={backEnabled} onClick={() => goBackward()} />
            {firstPageNumber}
            {previousDots}
            {previousPageNumber}
            <View style={styles.paginationNumberView}>
                <Text style={styles.paginationSelectedNumberText}>{currentPage}</Text>
            </View>
            {nextPageNumber}
            {nextDots}
            {lastPageNumber}
            <PaginationButton text={forward} enabled={forwardEnabled} onClick={() => goForward()} />
            <PaginationButton text={forward + forward} enabled={forwardEnabled} onClick={() => goLast()} />
        </View>
    );
}

export default Pagination;