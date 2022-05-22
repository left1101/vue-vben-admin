import { defineComponent, reactive, ref, toRaw } from 'vue';
import {
  Table,
  Input,
  Tag,
  Popover,
  Divider,
  Select,
  SelectOption,
  RangePicker,
} from 'ant-design-vue';
import { cloneDeep } from 'lodash-es';
import { FilterFilled } from '@ant-design/icons-vue';

const filterConditionList = [
  {
    name: '≥大于等于',
    value: 'gte',
  },
  {
    name: '>大于',
    value: 'gt',
  },
  {
    name: '≤小于等于',
    value: 'lte',
  },
  {
    name: '小于',
    value: 'lt',
  },
  {
    name: '⊇包含',
    value: 'contain',
  },
  {
    name: '等于空',
    value: 'eqnull',
  },
];

const ProTable = defineComponent({
  props: [
    'dataSource',
    'renderSummary',
    'summaryPosition',
    'showFilter',
    'showSelection',
    'columns',
    'expandedRowRender',
    'renderFooter',
    'renderTitle',
    'onDataChange',
  ],
  setup(props: any, context: any) {
    const { slots, emit } = context;
    const editableData = reactive({});
    const inputRef = ref(null);
    const headerInfoTags = ref<any>([]);
    const filterObj = ref<any>({});

    const edit = (record: any, column: any, dataIndex: string) => {
      const { key: row } = record;
      if (!column.canEditable) {
        return;
      }
      editableData[`${row}-${dataIndex}`] = cloneDeep(
        props.dataSource.filter((item) => row === item.key)[0],
      );

      setTimeout(() => {
        if (inputRef.value && typeof inputRef.value.focus === 'function') {
          inputRef.value.focus();
        }
      }, 100);
    };

    const save = (row: string, dataIndex: string, index: number) => {
      const valueStr = editableData[`${row}-${dataIndex}`];
      if (!valueStr) {
        return;
      }
      const newItem = Object.assign(
        {},
        props.dataSource.filter((item) => row === item.key)[0],
        valueStr,
      );
      const newDataSource = [...toRaw(props.dataSource)];
      newDataSource.splice(index, 1, newItem);

      emit('update:dataSource', newDataSource);
      if (props.onDataChange && typeof props.onDataChange === 'function') {
        props.onDataChange(valueStr, row, dataIndex);
      }

      delete editableData[`${row}-${dataIndex}`];
    };

    const handleClose = (item) => {
      const headerInfoTagsTmp = [...headerInfoTags.value];
      const idx = headerInfoTagsTmp.findIndex((i) => i.name === item.name);
      headerInfoTagsTmp.splice(idx, 1);
      headerInfoTags.value = headerInfoTagsTmp;
    };

    const handleClearAll = () => {
      headerInfoTags.value = [];
    };

    const handleFilterClick = (dataIndex) => {
      const filterValue = filterObj.value[dataIndex] || {};
      const filterValueTmp = Object.assign({}, filterValue, {
        visible: true,
      });
      filterObj.value[dataIndex] = filterValueTmp;
    };

    const handleQueryClick = (dataIndex) => {
      const filterValue = filterObj.value[dataIndex] || {};
      const filterValueTmp = Object.assign({}, filterValue, {
        visible: false,
      });
      filterObj.value[dataIndex] = filterValueTmp;

      const filterObjRaw = toRaw(filterObj.value);
      const obj = Object.entries(filterObjRaw).map((item) => {
        const [key, value] = item;
        const keyTmp = key.split('-');
        const { filterStr, inputStr } = (value || {}) as any;
        return {
          [keyTmp[0]]: {
            filterStr,
            inputStr,
          },
        };
      });

      if (props.onFilterQuery && typeof props.onFilterQuery === 'function') {
        props.onFilterQuery(obj);
      }
    };

    const handleClearClick = (dataIndex) => {
      filterObj.value[dataIndex] = {
        visible: false,
      };
    };

    const handleClearAllClick = () => {
      filterObj.value = {};

      if (props.onFilterClearAll && typeof props.onFilterClearAll === 'function') {
        props.onFilterClearAll();
      }
    };

    const handleFilterItemClick = (item, dataIndex) => {
      const filterValue = filterObj.value[dataIndex] || {};
      const filterValueTmp = Object.assign({}, filterValue, {
        filterStr: item.value,
        visible: filterValue.visible,
      });
      filterObj.value[dataIndex] = filterValueTmp;
    };

    const handleInputChange = (event, dataIndex) => {
      const filterValue = filterObj.value[dataIndex] || {};
      const filterValueTmp = Object.assign({}, filterValue, {
        inputStr: event.target.value,
      });
      filterObj.value[dataIndex] = filterValueTmp;
    };

    const handleSelectChange = (value, dataIndex) => {
      const filterValue = filterObj.value[dataIndex] || {};
      const filterValueTmp = Object.assign({}, filterValue, {
        selectValue: value,
      });
      filterObj.value[dataIndex] = filterValueTmp;
    };

    const handleDatePickerChange = (value, dataIndex) => {
      const filterValue = filterObj.value[dataIndex] || {};
      const filterValueTmp = Object.assign({}, filterValue, {
        datepickerValue: value,
      });
      filterObj.value[dataIndex] = filterValueTmp;
    };

    const handlePopoverVisibleChange = (visible, dataIndex) => {
      const filterValue = filterObj.value[dataIndex] || {};
      const filterValueTmp = Object.assign({}, filterValue, {
        visible,
      });
      filterObj.value[dataIndex] = filterValueTmp;
    };

    const renderTitle = () => {
      return (
        <div class="header-tags-wrap">
          <div class="header-tag-left">
            <span style={{ marginRight: '15px' }}>
              已选<span>{headerInfoTags.value.length}</span>项
            </span>
            {headerInfoTags.value.map((item: any) => {
              return (
                <Tag closable onClose={() => handleClose(item)}>
                  {item.name}
                </Tag>
              );
            })}
          </div>
          <div onClick={handleClearAll} style={{ cursor: 'pointer' }}>
            全部清空
          </div>
        </div>
      );
    };

    const renderFilterContent = (index) => {
      const filterValue = filterObj.value[index] || {};
      const defaultColor = {
        padding: '4px',
        textAlign: 'center',
        cursor: 'pointer',
      };

      return (
        <div>
          {filterConditionList.map((item) => {
            let bgColor = { ...defaultColor };
            if (filterValue.filterStr === item.value) {
              bgColor = Object.assign({}, bgColor, {
                backgroundColor: '#eff5ff',
                color: '#004ea2',
                borderRadius: '4px',
              });
            }

            return (
              <div style={bgColor as any} onClick={() => handleFilterItemClick(item, index)}>
                {item.name}
              </div>
            );
          })}
          <Divider style={{ margin: '10px 0px' }} />

          <div style={defaultColor as any} onClick={() => handleQueryClick(index)}>
            {'执行查询'}
          </div>
          <div style={defaultColor as any} onClick={() => handleClearClick(index)}>
            {'清除当前条件'}
          </div>
          <div style={defaultColor as any} onClick={handleClearAllClick}>
            {'清除所有条件'}
          </div>
        </div>
      );
    };

    const renderFilterType = (column, filterValue) => {
      if (!column.filterFn || typeof column.filterFn !== 'function') {
        return null;
      }
      const filterFnObj = column.filterFn(column.dataIndex);
      const key = `${column.key}-${column.dataIndex}`;
      if (filterFnObj.type === 'input') {
        return (
          <Input
            placeholder="请输入"
            value={filterValue.inputStr || ''}
            onChange={(event) => handleInputChange(event, key)}
          />
        );
      }

      if (filterFnObj.type === 'select') {
        return (
          <Select
            style={{ width: '100%' }}
            placeholder="请选择"
            value={filterValue.selectValue || undefined}
            onChange={(event) => handleSelectChange(event, key)}
          >
            {(filterFnObj.selectList || []).map((item) => {
              return (
                <SelectOption key={item} value={item}>
                  {item}
                </SelectOption>
              );
            })}
          </Select>
        );
      }

      if (filterFnObj.type === 'datepicker') {
        return (
          <RangePicker
            value={filterValue.datepickerValue || null}
            onChange={(event) => handleDatePickerChange(event, key)}
          />
        );
      }
    };

    const renderPopover = (column, filterValue, key) => {
      if (!column.filterFn || typeof column.filterFn !== 'function') {
        return null;
      }
      return (
        <Popover
          visible={filterValue.visible || false}
          destroyTooltipOnHide
          trigger="click"
          placement="bottom"
          content={renderFilterContent(key)}
          onVisibleChange={(visible) => handlePopoverVisibleChange(visible, key)}
        >
          <FilterFilled style={{ marginLeft: '15px' }} onClick={() => handleFilterClick(key)} />
        </Popover>
      );
    };

    const renderFilter = (column) => {
      const key = `${column.key}-${column.dataIndex}`;
      const filterValue = filterObj.value[key] || {};
      return (
        <div class="filter-cell-text-wrapper" style={{ height: '32px' }}>
          {renderFilterType(column, filterValue)}
          {renderPopover(column, filterValue, key)}
        </div>
      );
    };

    const renderBodyCell = (item) => {
      const { record, text, column, index } = item;
      const { dataIndex, isHtml, customRender } = column;

      if (customRender && typeof customRender === 'function') {
        return (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          >
            {customRender({ text, record, index, column })}
          </div>
        );
      }

      if (isHtml) {
        return (
          <div class="editable-cell-text-wrapper">
            <pre v-html={text} />
          </div>
        );
      }

      if (editableData[`${record.key}-${dataIndex}`]) {
        return (
          <div class="editable-cell-text-wrapper">
            <Input
              style={{ textAlign: 'center' }}
              v-model:value={editableData[`${record.key}-${dataIndex}`][dataIndex]}
              onPressEnter={() => save(record.key, dataIndex, index)}
              onBlur={() => save(record.key, dataIndex, index)}
              ref={inputRef}
            />
          </div>
        );
      }

      return (
        <div class="editable-cell-text-wrapper" onClick={() => edit(record, column, dataIndex)}>
          {text || ' '}
        </div>
      );
    };

    // const renderBodyCell = (item) => {
    //   // console.log('column, text, record', column, text, record);
    //   return <div class="editable-cell">{renderBodyCellContent(item)}</div>;
    // };

    const renderSummary = ({ pageData }) => {
      const columns = [...props.columns];
      // console.log('columns = ', columns);
      const columnsSummary = columns.reduce((total, item) => {
        if (item.summary) {
          const key = item.dataIndex;
          const count = pageData.reduce((t, i) => {
            const value = i[key];
            if (typeof value === 'number') {
              return t + value;
            }
            const valueNum = Number(value);
            if (valueNum && valueNum !== NaN) {
              return t + valueNum;
            }
            return t;
          }, 0);
          return [
            ...total,
            {
              num: `${count}`,
              column: item,
            },
          ];
        }
        return [
          ...total,
          {
            num: null,
            column: item,
          },
        ];
      }, []);

      return (
        <Table.Summary fixed={props.summaryPosition || 'bottom'} class="summary">
          <Table.Summary.Row>
            {props.showSelection && (
              <Table.Summary.Cell class="summary" index={0} align="center">
                总计
              </Table.Summary.Cell>
            )}
            {columnsSummary.map((item, index) => {
              if (!props.showSelection && index === 0) {
                return (
                  <Table.Summary.Cell class="summary" index={index} align="center">
                    总计
                  </Table.Summary.Cell>
                );
              }

              const { num, column } = item;
              let totalNum = num;
              if (column && typeof column.summaryFn === 'function') {
                totalNum = column.summaryFn(column.dataIndex);
              }
              if (column && typeof column.renderFn === 'function') {
                const summaryRenderFn = column.renderFn(totalNum);
                if (summaryRenderFn && typeof summaryRenderFn === 'string') {
                  return (
                    <Table.Summary.Cell index={index} align="center">
                      <div v-html={summaryRenderFn} />
                    </Table.Summary.Cell>
                  );
                }

                return summaryRenderFn;
              }
              return (
                <Table.Summary.Cell index={index} align="center">
                  {totalNum}
                </Table.Summary.Cell>
              );
            })}
          </Table.Summary.Row>
        </Table.Summary>
      );
    };

    const shouldShowSummary = () => {
      const columns = [...props.columns];
      return columns.reduce((total, item) => {
        if (item.summary) {
          return true;
        }
        return total;
      }, false);
    };

    const renderHeaderCell = ({ title, column }) => {
      return (
        <div>
          <div
            style={{
              padding: '12px',
              borderBottom: '1px solid #f0f0f0',
            }}
          >
            {title}
          </div>
          <div
            style={{
              padding: '12px',
              backgroundColor: '#ffffff',
            }}
          >
            {renderFilter(column)}
          </div>
        </div>
      );
    };

    const getSlots = () => {
      let mySlots = {
        ...slots,
      };

      if (props.renderTitle && typeof props.renderTitle === 'function') {
        mySlots = {
          ...mySlots,
          title: props.renderTitle,
        };
      } else if (props.showSelection) {
        mySlots = {
          ...mySlots,
          title: renderTitle,
        };
      }

      if (props.renderSummary && typeof props.renderSummary === 'function') {
        mySlots = {
          ...mySlots,
          summary: props.renderSummary,
        };
      } else if (shouldShowSummary()) {
        mySlots = {
          ...mySlots,
          summary: renderSummary as any,
        };
      }

      if (props.showFilter) {
        mySlots = {
          ...mySlots,
          headerCell: renderHeaderCell,
        };
      }

      return {
        ...mySlots,
        bodyCell: renderBodyCell,
      };
    };

    const getRowSelection = () => {
      if (props.showSelection) {
        return {
          rowSelection: {
            selectedRowKeys: headerInfoTags.value.map((item) => item.key),
            onChange: (selectedRowKeys, selectedRows) => {
              headerInfoTags.value = [...selectedRows];
            },
            getCheckboxProps: (record) => {
              return {
                disabled: !record.key,
                name: record.name,
                key: record.key,
                id: record.id,
              };
            },
          },
        };
      }

      return {};
    };

    return () => (
      <Table
        class="customer-table"
        {...props}
        {...getRowSelection()}
        dataSource={props.dataSource}
        columns={props.columns}
        v-slots={getSlots()}
      />
    );
  },
});

export default ProTable;
