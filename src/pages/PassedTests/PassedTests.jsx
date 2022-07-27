import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCompletedTests } from '../../asyncActions/completed';
import CompletedTetsBody from '../../components/AppBody/CompletedTetsBody';
import PassedTestActionForm from '../../components/PassedTestActionForm/PassedTestActionForm';
import CompletedTestHeader from '../../components/TestListHeader/CompletedTestHeader';

function PassedTests() {
  const dispatch = useDispatch();

  const [refresh, setRefresh] = useState(true);
  const completedTests = useSelector(
    (store) => store.completedTests.completedTests
  );

  useEffect(() => {
    getAllCompletedTests(dispatch);
  }, [refresh]);

  return (
    <CompletedTetsBody>
      <CompletedTestHeader
        name="Тест:"
        date="Дата прохождения:"
        action="Результат:"
      ></CompletedTestHeader>
      {completedTests.length ? (
        completedTests.map((test) => (
          <PassedTestActionForm
            key={test._id}
            test={test}
            refresh={refresh}
            setRefresh={setRefresh}
          ></PassedTestActionForm>
        ))
      ) : (
        <div>
          <h2>Сейчас у Вас нет пройденных тестов</h2>
        </div>
      )}
    </CompletedTetsBody>
  );
}
export default PassedTests;
