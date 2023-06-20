import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
  Tooltip,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';

import { DevTool } from '@hookform/devtools';
import { useLocalStorage } from 'usehooks-ts';


import { findBrazilianZipCode } from '../services/api';

import { UserSchema } from '../pages/Users/schemas/UserShema';

import { TUserShema, User } from '../pages/Users/types/User';
import { CheckCircle, Info } from '@mui/icons-material';
import { zodResolver } from '@hookform/resolvers/zod';
import FormTitle from './FormTitle';

const Form = () => {
  console.log('renderizou Form');
  const [users, setUsers] = useLocalStorage<User[]>('users', []);
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setFocus,
    setValue,
  } = useForm<User>({
    criteriaMode: 'all',
    mode: 'all',
    resolver: zodResolver(UserSchema),
    defaultValues: {
      addressName: '',
      birthdate: undefined,
      city: '',
      complement: '',
      document: '',
      email: '',
      emailVerified: undefined,
      zipCode: '',
      fullName: '',
      mobile: '',
      neighborhood: '',
      number: '',
      state: ''
    }
  });

  const [zipCodeFounded, setZipCodeFounded] = useState<boolean>();

  const onSubmit = (data: User) => {
    // registra o usuário
    console.log(data);
    if (!id) {
      setUsers([...users, { ...data, id: `${users.length + 1}` }]);
    } else {
      // se tiver id, atualiza o usuário
      const newUsers = [...users];
      const userIndex = users.findIndex((user) => user.id === id);
      newUsers[userIndex] = { ...data, id };

      setUsers(newUsers);
    }
    navigate('/users/');
  };

  // Função que busca o CEP e preenche os campos de endereço
  const onZipCode = useCallback(async (zipCode: string) => {
    console.log('renderizou useCallback onZipCode');


    if (zipCode.length != 9) return;

    const address = await findBrazilianZipCode(zipCode);

    if (!address || !address?.addressName) {
      setZipCodeFounded(false);

      setValue('addressName', '');
      setValue('neighborhood', '');
      setValue('city', '');
      setValue('state', '');

      setFocus('addressName');

      return;
    }

    setZipCodeFounded(true);

    setValue('addressName', address.addressName);
    setValue('neighborhood', address.neighborhood);
    setValue('city', address.city);
    setValue('state', address.state);

    setFocus('number');
  }, [setFocus, setValue]);

  const zipCode = watch('zipCode');

  useEffect(() => {
    console.log('renderizou useEffect zipCode');

    setValue('zipCode', zipCode.replace(/(\d{5})(\d{3})/, '$1-$2'));

    if (zipCode.length != 9) return;


    onZipCode(zipCode);
  }, [onZipCode, setValue, zipCode]);

  useEffect(() => {
    console.log('if !id', id);
    if (!id) return;
    console.log('passou.......', id);

    // busca o usuário pelo id
    const user = users.find((user) => user.id === id);

    if (!user) return;

    // se encontrado, preenche o formulário via setValue do React Hook Form
    setValue('fullName', user.fullName);
    setValue('document', user.document);
    setValue('birthdate', new Date(user.birthdate));
    setValue('email', user.email);
    setValue('emailVerified', user.emailVerified);
    setValue('mobile', user.mobile);
    setValue('zipCode', user.zipCode);
    setValue('addressName', user.addressName);
    setValue('number', user.number);
    setValue('complement', user.complement);
    setValue('neighborhood', user.neighborhood);
    setValue('city', user.city);
    setValue('state', user.state);
  }, [id]);

  return (
    <>
      <DevTool control={control} placement="top-right" />
      <Box
        component="form"
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={{ p: 2 }}
      >
        <TextField
          label="Nome Completo"
          fullWidth={true}
          error={!!errors.fullName}
          helperText={errors.fullName?.message}
          sx={{ marginBottom: 2 }}
          {...register('fullName')}
        />

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          sx={{ marginBottom: 2 }}
        >
          <Controller
            control={control}
            name="document"
            defaultValue=""
            render={({ field: { ...field } }) => (
              <FormControl fullWidth={true}>


                <TextField
                  label="CPF"
                  fullWidth={true}
                  error={!!errors.document}
                  helperText={errors.document?.message}
                  {...field}
                />


              </FormControl>
            )}
          />

          <Controller
            control={control}
            name="birthdate"
            render={({ field: { ...field } }) => (
              <FormControl fullWidth={true}>
                <DatePicker label="Data de Nascimento" {...field} />
              </FormControl>
            )}
          />
        </Stack>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          sx={{ marginBottom: 2 }}
        >
          <TextField
            label="E-mail"
            fullWidth={true}
            error={!!errors.email}
            helperText={errors.email?.message}
            {...register('email')}
          />

          <Controller
            control={control}
            name="mobile"
            defaultValue=""
            render={({ field: { ...field } }) => (
              <FormControl fullWidth={true}>


                <TextField
                  label="Celular"
                  fullWidth={true}
                  error={!!errors.mobile}
                  helperText={errors.mobile?.message}
                  {...field}
                />


              </FormControl>
            )}
          />
        </Stack>

        <FormTitle title="Endereço" />

        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{ marginBottom: 2, width: 250 }}
        >
          <Controller
            control={control}
            name="zipCode"
            defaultValue=""
            render={({ field: { ...field } }) => (
              <FormControl fullWidth={true} sx={{ width: 220 }}>
                <TextField
                  label="CEP"
                  fullWidth={true}
                  error={!!errors.zipCode}
                  helperText={
                    errors.zipCode?.message ||
                    (zipCodeFounded === false &&
                      'Não encontrado, favor preencher.')
                  }
                  {...field}
                />
              </FormControl>
            )}
          />
          {zipCodeFounded === true && <CheckCircle color="success" />}
        </Stack>

        <Controller
          control={control}
          name="addressName"
          defaultValue=""
          render={({ field: { ...field } }) => (
            <FormControl fullWidth={true} sx={{ marginBottom: 2 }}>
              <TextField
                label="Endereço"
                error={!!errors.addressName}
                helperText={errors.addressName?.message}
                disabled={!!zipCodeFounded}
                {...field}
              />
            </FormControl>
          )}
        />

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          sx={{ marginBottom: 2 }}
          spacing={2}
        >
          <TextField
            label="Número"
            fullWidth={true}
            error={!!errors.number}
            helperText={errors.number?.message}
            {...register('number')}
          />
          <TextField
            label="Complemento"
            fullWidth={true}
            error={!!errors.complement}
            helperText={errors.complement?.message}
            {...register('complement')}
          />
        </Stack>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          sx={{ marginBottom: 2 }}
          spacing={2}
        >
          <Controller
            control={control}
            name="neighborhood"
            defaultValue=""
            render={({ field: { ...field } }) => (
              <FormControl fullWidth={true}>
                <TextField
                  label="Bairro"
                  fullWidth={true}
                  error={!!errors.neighborhood}
                  helperText={errors.neighborhood?.message}
                  disabled={!!zipCodeFounded}
                  {...field}
                />
              </FormControl>
            )}
          />

          <Controller
            control={control}
            name="city"
            defaultValue=""
            render={({ field: { ...field } }) => (
              <FormControl fullWidth={true}>
                <TextField
                  label="Cidade"
                  fullWidth={true}
                  error={!!errors.city}
                  helperText={errors.city?.message}
                  disabled={!!zipCodeFounded}
                  {...field}
                />
              </FormControl>
            )}
          />
        </Stack>

        <Controller
          control={control}
          name="state"
          defaultValue=""
          render={({ field: { ...field } }) => (
            <FormControl fullWidth={true} sx={{ marginBottom: 2 }}>
              <InputLabel id="state">Estado</InputLabel>
              <Select
                label="Estado"
                labelId="state"
                ref={field.ref}
                name={field.name}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                disabled={!!zipCodeFounded}
              >
                <MenuItem value={''}></MenuItem>
                <MenuItem value={'AC'}>Acre</MenuItem>
                <MenuItem value={'AL'}>Alagoas</MenuItem>
                <MenuItem value={'AP'}>Amapá</MenuItem>
                <MenuItem value={'AM'}>Amazonas</MenuItem>
                <MenuItem value={'BA'}>Bahia</MenuItem>
                <MenuItem value={'CE'}>Ceará</MenuItem>
                <MenuItem value={'ES'}>Espírito Santo</MenuItem>
                <MenuItem value={'DF'}>Distrito Federal</MenuItem>
                <MenuItem value={'GO'}>Goiás</MenuItem>
                <MenuItem value={'MA'}>Maranhão</MenuItem>
                <MenuItem value={'MT'}>Mato Grosso</MenuItem>
                <MenuItem value={'MS'}>Mato Grosso do Sul</MenuItem>
                <MenuItem value={'MG'}>Minas Gerais</MenuItem>
                <MenuItem value={'PA'}>Pará</MenuItem>
                <MenuItem value={'PB'}>Paraíba</MenuItem>
                <MenuItem value={'PR'}>Paraná</MenuItem>
                <MenuItem value={'PE'}>Pernambuco</MenuItem>
                <MenuItem value={'PI'}>Piauí</MenuItem>
                <MenuItem value={'RJ'}>Rio de Janeiro</MenuItem>
                <MenuItem value={'RN'}>Rio Grande do Norte</MenuItem>
                <MenuItem value={'RS'}>Rio Grande do Sul</MenuItem>
                <MenuItem value={'RO'}>Rondônia</MenuItem>
                <MenuItem value={'RR'}>Roraima</MenuItem>
                <MenuItem value={'SC'}>Santa Catarina</MenuItem>
                <MenuItem value={'SP'}>São Paulo</MenuItem>
                <MenuItem value={'SE'}>Sergipe</MenuItem>
                <MenuItem value={'TO'}>Tocantins</MenuItem>
              </Select>
            </FormControl>

          )}
        />

        <Controller
          control={control}
          name="emailVerified"
          defaultValue={false}
          render={({ field: { onChange, value, ...field } }) => (
            <>
              <FormControlLabel
                control={
                  <Switch checked={value} onChange={onChange} {...field} />
                }
                label="Email Pré-verificado"
                sx={{ marginBottom: 2 }}
              />
              <Tooltip title="Cadastrar o usuário sem precisar confirmar seu e-mail.">
                <Info color="disabled" />
              </Tooltip>
            </>
          )}
        />

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Button type="submit" variant="contained" size="large">
            Criar Usuário
          </Button>
          <Button component={RouterLink} to="/users">
            Cancelar
          </Button>
        </Stack>
      </Box>
    </>
  );
};
export default Form;