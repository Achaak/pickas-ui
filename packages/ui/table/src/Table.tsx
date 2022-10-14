import React, { useEffect, useMemo, useState } from 'react'
import type {
  ColumnDef,
  OnChangeFn,
  PaginationState,
  RowSelectionState,
  SortingState,
  Updater,
} from '@tanstack/react-table'
import { flexRender } from '@tanstack/react-table'
import { useReactTable } from '@tanstack/react-table'
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from '@tanstack/react-table'
import type { PikasCSS } from '@pikas-ui/styles'
import { styled } from '@pikas-ui/styles'
import type { PaginationCSSProps } from './pagination/index.js'
import { Pagination } from './pagination/index.js'
import { IconByName } from '@pikas-ui/icons'
import { Checkbox } from '@pikas-ui/checkbox'
import { Thead } from './thead/index.js'
import { Tfoot } from './tfoot/index.js'

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  overflow: 'auto',
})

const TableStyled = styled('table', {
  borderCollapse: 'collapse',
  br: 'sm',
  color: '$BLACK',

  variants: {
    variant: {
      default: {},
      light: {},
    },
  },
})

const Tbody = styled('tbody', {
  variants: {
    variant: {
      default: {
        'tr:nth-child(2n)': {
          backgroundColor: '$GRAY_LIGHTER',
        },
      },
      light: {},
    },
  },
})

const Tr = styled('tr', {
  variants: {
    variant: {
      default: {},
      light: {},
    },
  },
})

const Th = styled('th', {
  variants: {
    variant: {
      default: {
        textAlign: 'left',
        fontWeight: '$MEDIUM',
      },
      light: {
        textAlign: 'left',
        fontWeight: '$MEDIUM',
      },
    },
    padding: {
      sm: {
        padding: '4px 8px',
      },
      md: {
        padding: '8px 16px',
      },
      lg: {
        padding: '16px 24px',
      },
    },
  },
})

const ThSpan = styled('span', {
  display: 'flex',

  variants: {
    variant: {
      default: {},
      light: {},
    },
  },
})

const Td = styled('td', {
  variants: {
    variant: {
      default: {},
      light: {},
    },
    padding: {
      sm: {
        padding: 8,
      },
      md: {
        padding: 16,
      },
      lg: {
        padding: 24,
      },
    },
  },
})

const TdContent = styled('div', {
  display: 'flex',

  variants: {
    variant: {
      default: {},
      light: {},
    },
  },
})

export const TableVariant = {
  default: true,
  light: true,
}
export type TableVariant = keyof typeof TableVariant

export interface TableCSS<T> {
  container?: PikasCSS
  table?: PikasCSS
  thead?: PikasCSS
  tbody?: PikasCSS
  tfoot?: PikasCSS
  tr?: PikasCSS
  th?: PikasCSS
  thSpan?: PikasCSS
  td?: PikasCSS
  tdContent?: PikasCSS
  tdEmptyMessage?: PikasCSS
  tdContentEmptyMessage?: PikasCSS
  pagination?: PaginationCSSProps
  column?: Partial<
    Record<
      keyof T,
      {
        th?: PikasCSS
        td?: PikasCSS
        thSpan?: PikasCSS
        tdContent?: PikasCSS
      }
    >
  >
}

export interface TablePaginationProps {
  active: boolean
  state?: PaginationState
  onPaginationChange?: OnChangeFn<PaginationState>
  selectValue?: number[]
}

export interface TableSelection {
  active: boolean
  defaultState?: RowSelectionState
  onRowSelectionChange?: OnChangeFn<RowSelectionState>
}

export interface TableSorting {
  active: boolean
  state?: SortingState
  onSortingChange?: OnChangeFn<SortingState>
}

export interface TablePadding {
  th?: 'sm' | 'md' | 'lg'
  td?: 'sm' | 'md' | 'lg'
}

export interface TableProps<T extends Record<string, unknown>> {
  variant?: TableVariant
  data: T[]
  emptyMessage?: React.ReactNode
  hasTfoot?: boolean
  pagination?: TablePaginationProps
  selection?: TableSelection
  sorting?: TableSorting
  columns: ColumnDef<T>[]
  css?: TableCSS<T>
  padding?: TablePadding
  hoverEffect?: boolean
}

export const Table = <T extends Record<string, unknown>>({
  data,
  hasTfoot,
  pagination = false,
  columns,
  selection,
  sorting,
  variant = 'default',
  css,
  padding = {
    th: 'md',
    td: 'md',
  },
  emptyMessage,
  hoverEffect = true,
}: TableProps<T>): JSX.Element => {
  const [selectionState, setSelectionState] = useState(
    selection?.defaultState || {}
  )
  const [sortingState, setSortingState] = useState<SortingState>([])

  /* Pagination */
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>(
    pagination?.state || {
      pageIndex: 0,
      pageSize: 5,
    }
  )

  const paginationMemo = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  )

  useEffect(() => {
    if (pagination?.state) {
      setPagination(pagination.state)
    }
  }, [pagination?.state])

  const handlePaginationChange = (state: Updater<PaginationState>): void => {
    pagination?.onPaginationChange?.(state)
    setPagination(state)
  }
  /* Pagination */

  /* Selection */
  const handleRowSelectionChange = (): void => {
    selection?.onRowSelectionChange?.(selectionState)
    setSelectionState(selectionState)
  }
  /* Selection */

  const columnsMemo = React.useMemo<ColumnDef<T>[]>(
    () => [
      ...(selection?.active
        ? ([
            {
              id: 'select',
              header: ({ table }) => (
                <Checkbox
                  size={20}
                  borderRadius="sm"
                  checked={table.getIsAllRowsSelected()}
                  onChange={table.toggleAllRowsSelected}
                  indeterminate={table.getIsSomeRowsSelected()}
                />
              ),
              cell: ({ row }) => (
                <Checkbox
                  size={20}
                  borderRadius="sm"
                  checked={row.getIsSelected()}
                  onChange={row.toggleSelected}
                  indeterminate={row.getIsSomeSelected()}
                />
              ),
            },
          ] as ColumnDef<T>[])
        : []),
      ...columns,
    ],
    []
  )

  const table = useReactTable({
    data,
    columns: columnsMemo,
    state: {
      ...(pagination?.active && { pagination: paginationMemo }),
      ...(selection?.active ? { rowSelection: selectionState } : {}),
      ...(sorting?.active ? { sorting: sortingState } : {}),
    },
    ...(pagination?.active
      ? {
          onPaginationChange: handlePaginationChange,
        }
      : {}),
    ...(selection?.active
      ? {
          onRowSelectionChange: handleRowSelectionChange,
        }
      : {}),
    ...(selection?.active && selection?.onRowSelectionChange
      ? {
          onRowSelectionChange: setSelectionState,
        }
      : {}),
    ...(sorting?.active
      ? {
          onPaginationChange: pagination?.onPaginationChange,
        }
      : {}),
    ...(sorting?.active
      ? {
          onSortingChange: setSortingState,
        }
      : {}),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: pagination?.active
      ? getPaginationRowModel()
      : undefined,
    getSortedRowModel: sorting?.active ? getSortedRowModel() : undefined,
  })

  useEffect(() => {
    if (selection?.active && selection?.onRowSelectionChange) {
      selection?.onRowSelectionChange(selectionState)
    }
  }, [selectionState])

  useEffect(() => {
    if (sorting?.active && sorting?.onSortingChange) {
      sorting?.onSortingChange(sortingState)
    }
  }, [sortingState])

  useEffect(() => {
    if (!sorting) return
    if (!sorting?.active) return
    setSortingState(sorting.state || [])
  }, [sorting?.state])

  useEffect(() => {
    if (!selection) return
    if (!selection.active) return
    setSelectionState(selection.defaultState || {})
  }, [selection?.defaultState])

  return (
    <Container css={css?.container}>
      <TableStyled variant={variant} css={css?.table}>
        <Thead variant={variant} css={css?.thead}>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr
              key={headerGroup.id}
              variant={variant}
              css={{
                ...(hoverEffect && {
                  transition: 'all 0.2s ease-in-out',

                  '&:hover': {
                    td: {
                      color: '$PRIMARY',
                      fontWeight: '$MEDIUM',
                    },
                  },
                }),
                ...css?.tr,
              }}
            >
              {headerGroup.headers.map((header) => (
                <Th
                  key={header.id}
                  colSpan={header.colSpan}
                  variant={variant}
                  css={{
                    ...css?.th,
                    ...css?.column?.[header.id as keyof T]?.th,
                  }}
                  padding={padding?.th}
                >
                  {header.isPlaceholder ? null : (
                    <ThSpan
                      css={{
                        ...css?.thSpan,
                        ...css?.column?.[header.id as keyof T]?.thSpan,
                        ...(header.column.getCanSort()
                          ? {
                              cursor: 'pointer',
                              userSelect: 'none',
                            }
                          : {}),
                      }}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: (
                          <IconByName
                            name="bx:chevron-up"
                            size="1em"
                            css={{
                              container: {
                                marginLeft: 4,
                              },
                            }}
                          />
                        ),
                        desc: (
                          <IconByName
                            name="bx:chevron-down"
                            size="1em"
                            css={{
                              container: {
                                marginLeft: 4,
                              },
                            }}
                          />
                        ),
                      }[header.column.getIsSorted()] ?? null}
                    </ThSpan>
                  )}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody variant={variant} css={css?.tbody}>
          {table.getRowModel().rows.map((row) => {
            return (
              <Tr key={row.id} variant={variant} css={css?.tr}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <Td
                      key={cell.id}
                      variant={variant}
                      css={{
                        ...css?.td,
                        ...css?.column?.[cell.column.id as keyof T]?.td,
                      }}
                      padding={padding?.td}
                    >
                      <TdContent
                        variant={variant}
                        css={{
                          ...css?.tdContent,
                          ...css?.column?.[cell.column.id as keyof T]
                            ?.tdContent,
                        }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TdContent>
                    </Td>
                  )
                })}
              </Tr>
            )
          })}

          {!table.getRowModel().rows.length && emptyMessage ? (
            <Tr key="empty">
              <Td
                colSpan={1000}
                css={{
                  ...css?.tdEmptyMessage,
                }}
                padding={padding?.td}
                variant={variant}
              >
                <TdContent
                  css={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    ...css?.tdContentEmptyMessage,
                  }}
                  variant={variant}
                >
                  {emptyMessage}
                </TdContent>
              </Td>
            </Tr>
          ) : null}
        </Tbody>
        {hasTfoot ? (
          <Tfoot variant={variant} css={css?.tfoot}>
            {table.getFooterGroups().map((footerGroup) => (
              <Tr key={footerGroup.id} variant={variant} css={css?.tr}>
                {footerGroup.headers.map((header) => (
                  <Th
                    key={header.id}
                    colSpan={header.colSpan}
                    variant={variant}
                    css={{
                      ...css?.th,
                      ...css?.column?.[header.id as keyof T]?.th,
                    }}
                    padding={padding?.th}
                  >
                    {header.isPlaceholder ? null : (
                      <ThSpan
                        css={{
                          ...css?.thSpan,
                          ...css?.column?.[header.id as keyof T]?.thSpan,
                          ...(header.column.getCanSort()
                            ? {
                                cursor: 'pointer',
                                userSelect: 'none',
                              }
                            : {}),
                        }}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: (
                            <IconByName
                              name="bx:chevron-up"
                              size="1em"
                              css={{
                                container: {
                                  marginLeft: 4,
                                },
                              }}
                            />
                          ),
                          desc: (
                            <IconByName
                              name="bx:chevron-down"
                              size="1em"
                              css={{
                                container: {
                                  marginLeft: 4,
                                },
                              }}
                            />
                          ),
                        }[header.column.getIsSorted()] ?? null}
                      </ThSpan>
                    )}
                  </Th>
                ))}
              </Tr>
            ))}
          </Tfoot>
        ) : null}
      </TableStyled>

      {pagination?.active ? (
        <Pagination
          canNextPage={table.getCanNextPage()}
          canPreviousPage={table.getCanPreviousPage()}
          nextPage={table.nextPage}
          pageCount={table.getPageCount()}
          pageIndex={table.getState().pagination.pageIndex}
          previousPage={table.previousPage}
          selectValue={pagination.selectValue || [5, 10, 25, 50, 100]}
          setPageSize={table.setPageSize}
          setPageIndex={table.setPageIndex}
          defaultPageSize={5}
          css={css?.pagination}
        />
      ) : null}
    </Container>
  )
}
