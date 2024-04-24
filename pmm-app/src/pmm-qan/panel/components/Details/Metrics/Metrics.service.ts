import { apiRequestQAN } from 'shared/components/helpers/api';
import { getLabelQueryParams } from 'pmm-qan/panel/QueryAnalytics.tools';
import { HistogramRequest, HistogramResponse } from './Metrics.types';

export const getMetrics = async ({
  filterBy, groupBy, labels = [], from, to, tables = [], totals,
}) => {
  const body = {
    filter_by: filterBy || '',
    group_by: groupBy,
    labels: getLabelQueryParams(labels),
    period_start_from: from,
    period_start_to: to,
    tables,
    totals,
  };

  return apiRequestQAN.post<any, any>('/v1/qan:getMetrics', body);
};

export const getHistogram = async ({
  queryId, labels = [], from, to,
}) => {
  const body = {
    queryid: queryId,
    labels: getLabelQueryParams(labels),
    period_start_from: from,
    period_start_to: to,
  };

  return apiRequestQAN.post<HistogramResponse, HistogramRequest>('/v1/qan:getHistogram', body);
};

export default {
  getMetrics,
  getHistogram,
};
