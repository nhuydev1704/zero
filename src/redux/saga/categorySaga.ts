import {call, put, select, takeLatest} from 'redux-saga/effects';
import {selectUserId} from '../slice/userIdSlice';
import {FETCH_ALL_CATEGORY_DATA} from '../actionTypes';
import {getAllCategoriesByUserId} from '../../services/CategoryService';
import {setCategoryData} from '../slice/categoryDataSlice';

function* fetchAllCategories(): Generator<any, void, any> {
  try {
    console.log('in categories');
    const userId = yield select(selectUserId);
    const categories = yield call(getAllCategoriesByUserId, userId);
    yield put(setCategoryData(categories));
    console.log(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
}

export function* watchFetchAllCategories() {
  yield takeLatest(FETCH_ALL_CATEGORY_DATA, fetchAllCategories);
}