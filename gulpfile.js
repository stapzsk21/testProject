const gulp = require('gulp');
const spawn = require('cross-spawn');
const path = require('path');
const fs = require('fs-extra');
const glob = require('glob');
const { parse } = require('csv-parse/sync');

// Путь к локальному vite
const vitePath = path.join(process.cwd(), 'node_modules', '.bin', 'vite');

// Задача для запуска dev-сервера
function start(done) {
  const viteProcess = spawn(vitePath, [], {
    stdio: 'inherit',
    shell: true,
  });

  // Обработка сигнала завершения
  process.on('SIGINT', () => {
    viteProcess.kill('SIGINT');
    process.exit(0);
  });

  viteProcess.on('close', (code) => {
    if (code !== 0) {
      done(new Error('Vite process exited with code ' + code));
    } else {
      done();
    }
  });
}

// Задача для сборки релизной версии
function release(done) {
  const viteProcess = spawn(vitePath, ['build'], {
    stdio: 'inherit',
    shell: true,
  });

  viteProcess.on('close', (code) => {
    if (code !== 0) {
      done(new Error('Vite process exited with code ' + code));
    } else {
      const dataJsonPath = path.join(process.cwd(), 'src', 'assets', 'json', 'data.json');
      const buildDataJsonPath = path.join(process.cwd(), 'build', 'data.json');

      // Копируем data.json в папку build
      fs.copySync(dataJsonPath, buildDataJsonPath);
      done();
    }
  });
}

// 🔍 Функция для поиска неиспользуемых картинок
function findUnusedImages() {
  const imagesDir = path.join(process.cwd(), 'src', 'assets', 'images');
  const srcDir = path.join(process.cwd(), 'src');

  // Собираем все картинки, исключая папку email
  const images = glob.sync(`${imagesDir}/**/*.{png,jpg,jpeg,gif,svg,webp}`, {
    ignore: [`${imagesDir}/email/**`],
  });

  // Собираем все файлы проекта
  const codeFiles = glob.sync(`${srcDir}/**/*.{js,jsx,ts,tsx,css,scss,html,json}`, { nodir: true });

  // Читаем весь проект как массив строк
  const allLines = codeFiles.flatMap((file) => fs.readFileSync(file, 'utf8').split(/\r?\n/));

  // Фильтруем
  return images.filter((imgPath) => {
    const fileName = path.basename(imgPath);

    // Ищем хотя бы одно упоминание вне комментария
    const isUsed = allLines.some((line) => {
      const trimmed = line.trim();
      // Пропускаем закомментированные строки (JS/TS/JSON/HTML/CSS)
      if (
        trimmed.startsWith('//') || // однострочный комментарий JS/TS
        trimmed.startsWith('/*') || // начало многострочного
        trimmed.startsWith('*') || // внутри многострочного
        trimmed.startsWith('--') || // SQL-style
        trimmed.startsWith('#') // yaml/python-style
      ) {
        return false;
      }
      return line.includes(fileName);
    });

    return !isUsed;
  });
}

// 🗑 Удаление не испольуемых картинок
function cleanImages(done) {
  const unused = findUnusedImages();

  // Исключаем logo и logo-dark
  const filteredUnused = unused.filter((f) => {
    const name = path.basename(f, path.extname(f)); // имя файла без расширения
    return !['logo', 'logo-dark', 'favicon', 'news'].includes(name);
  });

  if (filteredUnused.length === 0) {
    console.log('✨ Все картинки используются или защищены от удаления');
  } else {
    filteredUnused.forEach((f) => {
      fs.removeSync(f);
      console.log(`🗑 Удалено: ${path.relative(process.cwd(), f)}`);
    });
    console.log(`✅ Удалено ${filteredUnused.length} картинок`);
  }

  done();
}

// Мапа для заголовков
const nameRowMap = new Map([
  ['Ссылка на параметры трафиков', 'trafficLink'],
  ['Название компании', 'name'],
  ['Почта', 'mail'],
  ['Основной домен (сайт)', 'site'],
  ['Домен Терминала', 'terminalDomain'],
  ['Копия терминала', 'terminalCopy'],
  ['Зеркало сайта', 'mirror'],

  ['Ежедневный оборот:', 'counterNumber1'],
  ['Общий баланс клиентов:', 'counterNumber2'],
  ['Активные трейдеры:', 'counterNumber3'],
  ['Лицензии:', 'counterNumber4'],
  ['Поставщики ликвидности:', 'counterNumber5'],

  ['Ссылка на задачу Proof of Collateral', 'proofOfCollateralLink'],

  ['Номер телефона', 'phone'],
  ['Адрес компании', 'address'],
  ['Номера лицензий для футера', 'numberLicense'],
  ['Registered company number', 'registerNumber'],

  ['Номера лицензий для DFSA', 'dfsaLicenseNumbers'],
  ['Номер страницы для DFSA', 'dfsaNumber'],
  ['Дата лицензии для DFSA', 'dfsaDate'],

  ['Номер страницы для FCA/"Firm reference number"', 'fcaNumber'],
  ['Дата лицензии для FCA', 'fcaDate'],

  ['Номер страницы для VFSC / Лицензия', 'vfscNumber'],
  ['Дата лицензии для VFSC', 'vfscDate'],

  ['CSSF N°:', 'cssfNumber'],
  ['Constitution date', 'cssfDateConstitution'],
  ['Inscription date', 'cssfDateInscription'],

  ['Формат документов', 'documentFormat'],
]);

function replaceField(block, key, newValue) {
  if (!newValue) return block;
  const escaped = String(newValue).replace(/"/g, '\\"');

  // Если поле уже есть, заменяем
  const regex = new RegExp(`(${key}:\\s*")[^"]*(")`, 'm');
  if (regex.test(block)) {
    return block.replace(regex, `$1${escaped}$2`);
  } else {
    // Если поля нет — добавляем перед закрывающей скобкой
    return block.replace(/(\n\s*\})/, `\n    ${key}: "${escaped}",$1`);
  }
}

function replaceLicenseField(block, key, newValue) {
  if (!newValue) return block;
  const escaped = String(newValue).replace(/"/g, '\\"');

  const regex = new RegExp(`(${key}:\\s*")[^"]*(")`, 'm');
  if (regex.test(block)) {
    return block.replace(regex, `$1${escaped}$2`);
  } else {
    return block.replace(/(\n\s*\})/, `\n        ${key}: "${escaped}",$1`);
  }
}

function updateCounterNumbers(content, valMap) {
  Object.entries(valMap).forEach(([itemKey, value]) => {
    if (!value) return;
    const formatted = new Intl.NumberFormat('ru-RU').format(value).replace(/\u00A0/g, ' ');

    // Регулярка ищет только number внутри конкретного item
    const regex = new RegExp(`(${itemKey}:\\s*\\{[\\s\\S]*?number:\\s*)["'].*?["']`, 'm');

    content = content.replace(regex, `$1"${formatted}"`);
  });

  return content;
}

function setSiteConfig(done) {
  const csvPath = path.join(__dirname, 'config.csv');
  const siteConfigPath = path.join(__dirname, 'src', 'constants', 'site.config.jsx');

  const csv = fs.readFileSync(csvPath, 'utf-8');
  const rows = parse(csv, { skip_empty_lines: true, relax_column_count: true });

  const configs = {};

  for (const row of rows) {
    const [, keyRaw, valueRaw] = row;
    if (!keyRaw || !valueRaw) continue;
    const key = keyRaw.trim();
    const value = valueRaw.trim();
    if (!nameRowMap.has(key)) continue;
    const mappedKey = nameRowMap.get(key);
    configs[mappedKey] = value.toLowerCase() === 'нет' ? '' : value;
  }
  console.debug('📄 configs:', configs);
  let content = fs.readFileSync(siteConfigPath, 'utf-8');

  // Обновляем documents
  if (configs.documentFormat) {
    const docRegex = /documents:\s*["'\d]+/;
    const replaced = `documents: ${configs.documentFormat}`;
    if (docRegex.test(content)) {
      content = content.replace(docRegex, replaced);
    } else {
      content = content.replace(
        /(export const APP_CONSTANTS = \{)/,
        `$1\n    documents: ${configs.documentFormat},`
      );
    }
  }

  // Обновляем companyData
  content = content.replace(/companyData:\s*\{([\s\S]*?)\n\s*\},/m, (match, block) => {
    let newBlock = block;
    newBlock = replaceField(newBlock, 'title', configs.name);
    newBlock = replaceField(newBlock, 'adres', configs.address);
    newBlock = replaceField(newBlock, 'phone', configs.phone);
    newBlock = replaceField(newBlock, 'email', configs.mail);
    newBlock = replaceField(newBlock, 'url', configs.site ? `https://${configs.site}` : '');
    newBlock = replaceField(
      newBlock,
      'domain',
      configs.terminalDomain ? `https://${configs.terminalDomain}` : ''
    );

    // Обновляем license внутри companyData
    newBlock = newBlock.replace(/license:\s*\{([\s\S]*?)\n\s*\}/m, (licMatch, licBlock) => {
      let newLicBlock = licBlock;
      newLicBlock = replaceLicenseField(newLicBlock, 'lls1', configs.numberLicense);
      newLicBlock = replaceLicenseField(newLicBlock, 'lls2', configs.dfsaLicenseNumbers);
      return `license: {${newLicBlock}\n    }`;
    });

    return `companyData: {${newBlock}\n},`;
  });

  //Обновляем javascript.lisences_page
  content = content.replace(/lisences_page:\s*\{([\s\S]*?)\n\s*\},/m, (match, block) => {
    let newBlock = block;
    newBlock = replaceField(newBlock, 'dfsa', configs.dfsaNumber ? configs.dfsaNumber : '');
    newBlock = replaceField(newBlock, 'fca', configs.fcaNumber ? configs.fcaNumber : '');
    newBlock = replaceField(
      newBlock,
      'vfsc',
      configs.vfscNumber ? `/firm-${configs.vfscNumber}` : ''
    );
    newBlock = replaceField(
      newBlock,
      'cssf',
      configs.cssfNumber ? `/${configs.cssfNumber.substring(1)}` : ''
    );

    return `lisences_page: {${newBlock}\n},`;
  });

  // Обновляем javascript.counterNumbers
  const valMap = {
    item1: configs.counterNumber1,
    item2: configs.counterNumber2,
    item3: configs.counterNumber3,
    item4: configs.counterNumber4,
    item5: configs.counterNumber5,
  };
  content = updateCounterNumbers(content, valMap);

  fs.writeFileSync(siteConfigPath, content, 'utf-8');
  console.log('✅ site.config.jsx обновлён успешно');

  done();
}

// Экспорт задач
exports.start = start;
exports.release = release;
exports['build:release'] = release; // Алиас для совместимости
exports.cleanImages = cleanImages;
exports.setSiteConfig = setSiteConfig;
exports.default = start;
