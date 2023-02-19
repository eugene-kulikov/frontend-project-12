import * as yup from 'yup';

export default (t, names) => yup.object({
  name: yup.string()
    .required(t('validation.required'))
    .min(3, t('validation.intervalLength'))
    .max(20, t('validation.intervalLength'))
    .notOneOf(names, t('validation.unique')),
});
