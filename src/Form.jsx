import { useFormik } from 'formik';
import * as Yup from 'yup';

const Form = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      amount: 0,
      currency: '',
      text: '',
      terms: false,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(4, 'Минимум 4 символа')
        .max(20, 'Максимально 20 символов')
        .required('Обязательное поле!'),
      email: Yup.string().email('Неправильный email адрес').required('Обязательное поле!'),

      amount: Yup.number()
        .min(100, 'Не менее 100')
        .max(1000, 'Максимально 1000')
        .required('Обязательное поле!'),

      currency: Yup.string().required('Выберите валюту'),
      text: Yup.string().min(10, 'Немение 10 символов'),

      terms: Yup.boolean().required('Необходимо согласие').oneOf([true], 'Необходимо согласие'),
    }),
    onSubmit: (values) => console.log(JSON.stringify(values, null, 2)),
  });
  return (
    <form className="form" onSubmit={formik.handleSubmit}>
      <h2>Отправить пожертвование</h2>
      <label htmlFor="name">Ваше имя</label>
      <input
        id="name"
        name="name"
        type="text"
        value={formik.values.name}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
      />
      {formik.errors.name && formik.touched.name ? <div className="error">{formik.errors.name}</div> : null}
      <label htmlFor="email">Ваша почта</label>
      <input
        id="email"
        name="email"
        type="email"
        onBlur={formik.handleBlur}
        value={formik.values.email}
        onChange={formik.handleChange}
      />
      {formik.errors.email && formik.touched.email ? <div className="error">{formik.errors.email}</div> : null}
      <label htmlFor="amount">Количество</label>
      <input
        id="amount"
        name="amount"
        type="number"
        value={formik.values.amount}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
      />
      {formik.errors.amount && formik.touched.amount ? <div className="error">{formik.errors.amount}</div> : null}
      <label htmlFor="currency">Валюта</label>
      <select
        id="currency"
        name="currency"
        value={formik.values.currency}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}>
        <option value="">Выберите валюту</option>
        <option value="USD">USD</option>
        <option value="UAH">UAH</option>
        <option value="TRY">TRY</option>
      </select>
      {formik.errors.currency && formik.touched.currency ? <div className="error">{formik.errors.currency}</div> : null}
      <label htmlFor="text">Ваше сообщение</label>
      <textarea
        id="text"
        name="text"
        value={formik.values.text}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
      />
      {formik.errors.text && formik.touched.text ? <div className="error">{formik.errors.text}</div> : null}
      <label className="checkbox">
        <input
          name="terms"
          type="checkbox"
          value={formik.values.terms}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        Соглашаетесь с политикой конфиденциальности?
      </label>
      {formik.errors.terms && formik.touched.terms ? <div className="error">{formik.errors.terms}</div> : null}
      <button type="submit">Отправить</button>
    </form>
  );
};

export default Form;