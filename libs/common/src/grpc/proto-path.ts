import { promises as fs } from 'fs';
import path from 'path';

/**
 * dirPath 디렉토리 안에 있는 모든 .proto 파일들의 절대 경로를 string 배열로 반환합니다.
 * @param dirPath .proto 파일들을 찾을 디렉토리 경로
 */
export async function getProtoPaths(dirPath: string): Promise<string[]> {
  const files = await fs.readdir(dirPath);

  const protoPaths = await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(dirPath, file);

      const stats = await fs.stat(filePath);

      if (stats.isDirectory()) {
        return await getProtoPaths(filePath);
      } else if (file.endsWith('.service.proto')) {
        return path.resolve(filePath);
      }
    }),
  );

  return protoPaths.flat();
  // return { protoPaths: protoPaths.flat() };
}

const PACKAGE_NAME_REGEX = /export const (?:[A-Z_]+)(PACKAGE_NAME) = "(.*?)";/g;

/**
 * dirPath 디렉토리 안에 있는 nestjs 디렉토리의 .service.ts 파일들에서 PACKAGE_NAME 형식의 상수를 추출하여 string 배열로 반환합니다.
 *
 * @param dirPath nestjs 프로젝트 디렉토리 경로
 */
export async function getPackageNames(
  dirPath: string,
  domainName: string,
): Promise<string[]> {
  const nestjsDirPath = path.join(dirPath, 'domain', domainName, 'nestjs');

  const files = await fs.readdir(nestjsDirPath);

  const serviceFiles = files.filter((file) => file.endsWith('.service.ts'));

  const packageNames = await Promise.all(
    serviceFiles.map(async (file) => {
      const filePath = path.join(nestjsDirPath, file);
      const content = await fs.readFile(filePath, 'utf-8');
      const matches = content.matchAll(PACKAGE_NAME_REGEX);

      const names = [];
      for (const match of matches) {
        names.push(match[2]);
      }

      return names;
    }),
  );

  return packageNames.flat().filter((packageName) => packageName !== '');
}

// export function getPackagesAndProtoPaths() {
//   const packageNames = [];
//   const protoPath = [];
//
//   return {
//     package: [],
//     protoPath: [],
//   };
// }
