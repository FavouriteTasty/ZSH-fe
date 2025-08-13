/* eslint-disable react-hooks/exhaustive-deps */
import type { Selection, SortDescriptor } from "@heroui/react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Input,
    Button,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Pagination,
} from "@heroui/react";
import { tr } from "framer-motion/client";
import {
    ChangeEvent,
    useCallback,
    useEffect,
    useMemo,
    useState,
    type FC,
} from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router";

import InviteAddAlert from "../invite-add-alert";
import { useTableRenderer } from "./hooks/useTableRender";

import { api } from "@/api";
import { tablePatientToPatient } from "@/api/type";
import { ChevronDownIcon, PlusIcon, SearchIcon } from "@/assets";
import { userColumns } from "@/types/keys";
import { Patient } from "@/types/table";
import { capitalize } from "@/utils/string";
import { SortDescriptor2SortOrder } from "@/utils/table";

const columns = userColumns;

const INITIAL_VISIBLE_COLUMNS = [
    "name",
    "age",
    "sex",
    "birth",
    "job",
    "actions",
];

export const HomeTable: FC = () => {
    const [filterValue, setFilterValue] = useState("");
    const [visibleColumns, setVisibleColumns] = useState<Selection>(
        new Set(INITIAL_VISIBLE_COLUMNS),
    );
    const [rowsPerPage, setRowsPerPage] = useState(7);
    const [sortDescriptor, setSortDescriptor] = useState<
        SortDescriptor | undefined
    >(undefined);
    const [patients, setPatients] = useState<Patient[]>([]);

    const { t, i18n } = useTranslation();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const currentPage = Number(queryParams.get("page") ?? "1");

    const [page, setPage] = useState(currentPage);
    const [pages, setPages] = useState(1);
    const [totalPatients, setTotalPatients] = useState<number>(0);
    const renderCell = useTableRenderer(t, i18n.language);

    const hasSearchFilter = Boolean(filterValue);

    const load = async () => {
        const raws = await api.table.list({
            page,
            limit: rowsPerPage,
            sortBy: sortDescriptor?.column as string,
            sortOrder: SortDescriptor2SortOrder(sortDescriptor),
        });
        console.log(raws);
        setPatients(raws.data.map((i) => tablePatientToPatient(i)));
        setPage(raws.pagination.page);
        setPages(raws.pagination.totalPages);
        setTotalPatients(raws.pagination.total);
    };

    useEffect(() => {
        load();
    }, [page, sortDescriptor, rowsPerPage]);

    const headerColumns = useMemo(() => {
        if (visibleColumns === "all") return columns;

        return columns.filter((column) =>
            Array.from(visibleColumns).includes(column.uid),
        );
    }, [visibleColumns]);

    const onNextPage = useCallback(() => {
        if (page < pages) {
            setPage(page + 1);
        }
    }, [page, pages]);

    const onPreviousPage = useCallback(() => {
        if (page > 1) {
            setPage(page - 1);
        }
    }, [page]);

    const onRowsPerPageChange = useCallback(
        (e: ChangeEvent<HTMLSelectElement>) => {
            setRowsPerPage(Number(e.target.value));
            setPage(1);
        },
        [],
    );

    const onSearchChange = useCallback((value?: string) => {
        if (value) {
            setFilterValue(value);
            setPage(1);
        } else {
            setFilterValue("");
        }
    }, []);

    const onClear = useCallback(() => {
        setFilterValue("");
        setPage(1);
    }, []);

    const topContent = useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-3 items-end">
                    <Input
                        isClearable
                        className="w-full sm:max-w-[44%]"
                        placeholder={t("tableSearchPlaceholder")}
                        startContent={<SearchIcon />}
                        value={filterValue}
                        onClear={() => onClear()}
                        onValueChange={onSearchChange}
                    />
                    <div className="flex gap-3">
                        {/* <Dropdown>
                            <DropdownTrigger className="hidden sm:flex">
                                <Button
                                    endContent={
                                        <ChevronDownIcon className="text-small" />
                                    }
                                    variant="flat"
                                >
                                    Status
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Table Columns"
                                closeOnSelect={false}
                                selectedKeys={statusFilter}
                                selectionMode="multiple"
                                onSelectionChange={setStatusFilter}
                            >
                                {statusOptions.map((status) => (
                                    <DropdownItem
                                        key={status.uid}
                                        className="capitalize"
                                    >
                                        {capitalize(status.name)}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown> */}
                        <Dropdown>
                            <DropdownTrigger className="hidden sm:flex">
                                <Button
                                    endContent={
                                        <ChevronDownIcon className="text-small" />
                                    }
                                    variant="flat"
                                >
                                    {t("columns")}
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Table Columns"
                                closeOnSelect={false}
                                selectedKeys={visibleColumns}
                                selectionMode="multiple"
                                onSelectionChange={setVisibleColumns}
                                // className="flex-wrap"
                                classNames={{
                                    list: "flex flex-row flex-wrap gap-2 max-w-[60vw] overflow-scroll max-h-[57vh]",
                                }}
                            >
                                {columns.map((column) => (
                                    <DropdownItem
                                        key={`${column.uid}`}
                                        className="capitalize flex-[1_0_calc(25%-8px)] min-w-[calc(25%-16px)] max-w-[calc(25%-16px)]"
                                    >
                                        {capitalize(
                                            t(`tableColumn.${column.uid}`),
                                        )}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                        <Button
                            color="primary"
                            endContent={<PlusIcon />}
                            onPress={() => {
                                window.open("/add", "_blank");
                            }}
                        >
                            {t("addNew")}
                        </Button>
                        <Button
                            color="primary"
                            endContent={<PlusIcon />}
                            onPress={() => setIsOpen(true)}
                        >
                            {t("inviteAdd.title")}
                        </Button>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-default-400 text-small">
                        {t("totalPatients", { count: totalPatients })}
                    </span>
                    <label className="flex items-center text-default-400 text-small">
                        {t("rowsPerPage")}
                        <select
                            className="bg-transparent outline-none text-default-400 text-small"
                            onChange={onRowsPerPageChange}
                        >
                            <option value="7">7</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                        </select>
                    </label>
                </div>
            </div>
        );
    }, [
        filterValue,
        visibleColumns,
        onSearchChange,
        onRowsPerPageChange,
        patients.length,
        hasSearchFilter,
        i18n.language,
    ]);

    const bottomContent = useMemo(() => {
        return (
            <div className="py-2 px-2 flex justify-between items-center">
                <div className="w-[25%]" />
                <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="primary"
                    page={page}
                    total={pages}
                    onChange={setPage}
                />
                <div className="hidden sm:flex w-[30%] justify-end gap-2">
                    <Button
                        isDisabled={pages === 1}
                        size="sm"
                        variant="flat"
                        onPress={onPreviousPage}
                    >
                        {t("previous")}
                    </Button>
                    <Button
                        isDisabled={pages === 1}
                        size="sm"
                        variant="flat"
                        onPress={onNextPage}
                    >
                        {t("next")}
                    </Button>
                </div>
            </div>
        );
    }, [patients.length, page, pages, hasSearchFilter, i18n.language]);

    // Invite User To Add
    const [isOpen, setIsOpen] = useState(true);

    return (
        <>
            <Table
                isHeaderSticky
                aria-label="Example table with custom cells, pagination and sorting"
                bottomContent={bottomContent}
                bottomContentPlacement="outside"
                classNames={{
                    wrapper: "max-h-[100%]",
                }}
                sortDescriptor={sortDescriptor}
                topContent={topContent}
                topContentPlacement="outside"
                onSortChange={setSortDescriptor}
                key={`home-table-${i18n.language}`}
            >
                <TableHeader columns={headerColumns}>
                    {(column) => (
                        <TableColumn
                            key={column.uid}
                            align={
                                column.uid === "actions" ? "center" : "start"
                            }
                            allowsSorting={column.sortable}
                        >
                            {capitalize(t(`tableColumn.${column.uid}`))}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody emptyContent={t("noPatientsFound")} items={patients}>
                    {(item) => (
                        <TableRow key={item.id}>
                            {(columnKey) => (
                                <TableCell>
                                    {renderCell(item, columnKey)}
                                </TableCell>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <InviteAddAlert
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            ></InviteAddAlert>
        </>
    );
};
