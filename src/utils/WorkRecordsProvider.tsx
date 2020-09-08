import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  useEffect,
} from 'react';
import { ActivityRecord, ActivityTypes, TodayWorkReport } from '../types/Types';
import Http from './Http';
import last from "array-last";
import { ComponentContext } from '../shared/ComponentContext';
import { nowLocale, Moment, loadMoment } from './Moment';
import { useSnackbar } from 'notistack';

interface WorkRecordsContext {
  workRecords: ActivityRecord[];
  todayWorkReport?: TodayWorkReport;
  todayWorkRecords: ActivityRecord[];
  lastWorkRecord?: ActivityRecord;
  addWorkRecord(activityType: ActivityTypes): void;
  loadWorkRecordsByDate(date: Moment): void;
}

const WorkRecordsContext = createContext<WorkRecordsContext | null>(null);

const WorkRecordsProvider: React.FC = ({ children }) => {
  const [workRecords, setWorkRecords] = useState<ActivityRecord[]>([]);
  const [todayWorkRecords, setTodayWorkRecords] = useState<ActivityRecord[]>([]);
  const [lastWorkRecord, setLastWorkRecord] = useState<ActivityRecord>();
  const [todayWorkReport, setTodayWorkReport] = useState<TodayWorkReport>();
  const context = useContext(ComponentContext)
  const { user } = context
  const { enqueueSnackbar } = useSnackbar();

  async function loadWorkRecords(date?: Moment): Promise<void> {
    if (!user) return
    Http.get({
      path: `/work-records?userId=${user.id}&date=${date ? date.format("YYYY/MM/DD") : nowLocale().format("YYYY/MM/DD")}`,
      onError: (error: string) => {
        console.log("error", error)
        enqueueSnackbar('Request Error', { variant: 'error' })
      },
      onSuccess: (activities: ActivityRecord[]) => {
        setWorkRecords(activities)
        !date && setLastWorkRecord(last(activities))
        !date && setTodayWorkRecords(activities)
      }
    })
  }

  async function loadTodayReport(): Promise<void> {
    if (!user) return
    Http.get({
      path: `/daily-work-report?userId=${user.id}&date=${nowLocale().format("YYYY/MM/DD")}`,
      onError: (error: string) => {
        console.log("error", error)
        enqueueSnackbar('Request Error', { variant: 'error' })
      },
      onSuccess: (dailyReport: TodayWorkReport[]) => {
        setTodayWorkReport(dailyReport[0])
      }
    })
  }

  useEffect(() => {
    loadWorkRecords();
    loadTodayReport()
  }, []);

  const addWorkRecord = useCallback(async (activityType: ActivityTypes) => {
    if (!user) return
    Http.post({
      path: `/work-records`,
      body: {
        "userId": user.id,
        "date": nowLocale().format("YYYY/MM/DD"),
        "time": nowLocale().format("HH:mm"),
        "activityType": activityType
      },
      onError: (error: string) => {
        console.log("error", error)
      },
      onSuccess: (response: any) => {
        loadWorkRecords();
        enqueueSnackbar(activityType + ' Registered!', { variant: 'success' })
      }
    })

  }, []);

  const loadWorkRecordsByDate = useCallback(async (date: Moment) => {
    loadWorkRecords(date);
  }, []);


  const value = React.useMemo(
    () => ({ addWorkRecord, workRecords, loadWorkRecordsByDate, lastWorkRecord, todayWorkRecords, todayWorkReport }),
    [workRecords, addWorkRecord, loadWorkRecordsByDate, lastWorkRecord, todayWorkRecords, todayWorkReport],
  );

  return <WorkRecordsContext.Provider value={value}>{children}</WorkRecordsContext.Provider>;
};

function useWorkRecords(): WorkRecordsContext {
  const context = useContext(WorkRecordsContext);

  if (!context) {
    throw new Error(`useWorkRecords() must be used within a WorkRecordsProvider`);
  }

  return context;
}

export { WorkRecordsProvider, useWorkRecords };