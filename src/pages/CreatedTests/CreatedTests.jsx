import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTests } from '../../asyncActions/tests';
import cl from './CreatedTests.module.css';
import { useNavigate } from 'react-router-dom';
import { appPaths } from '../../utils/constants';
import CreatedTestsActionForm from '../../components/CreatedTestsActionForm/CreatedTestsActionForm';
import CompletedTetsBody from '../../components/AppBody/CompletedTetsBody';
import CompletedTestHeader from '../../components/TestListHeader/CompletedTestHeader';

function CreatedTests() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentTest = useSelector((store) => store.currentTest.currentTest);
  const tests = useSelector((store) => store.tests.tests);

  useEffect(() => {
    getAllTests(dispatch);
  }, [currentTest]);

  useEffect(() => {
    getAllTests(dispatch);
  }, [tests]);

  return (
    <CompletedTetsBody>
      <CompletedTestHeader
        name="Название:"
        date="Дата создания:"
        action="Действия:"
      ></CompletedTestHeader>
      {tests?.length ? (
        tests.map((test) => (
          <CreatedTestsActionForm
            key={test._id}
            test={test}
          ></CreatedTestsActionForm>
        ))
      ) : (
        <div>
          <h2>Вы пока еще не создали ни одного теста</h2>
        </div>
      )}
      <div className={cl.add_button}>
        <Button
          onClick={() => navigate(`/${appPaths.make}`, { replace: true })}
        >
          Создать тест
        </Button>
      </div>
    </CompletedTetsBody>
  );
}
export default CreatedTests;
