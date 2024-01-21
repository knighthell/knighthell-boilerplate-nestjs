# Docker Compose for DB

## Postgres

- server-place-postgres
  - image: postgis/postgis:15
    - platform: linux/amd64
      - mac에서 arm64가 아닌 amd64를 사용한 이유
        1. postgis/postgis 이미지는 현재 amd64만 지원
           2. 일반 postgres:15를 사용(해당 이미지는 buildx로 컨테이너가 배포되어 arm64 및 amd64를 둘다 지원. 각 docker pull을 받은 platform에 맞는 버전이 pull됨)하고 postgis를 확장할 수도 있으나 아래 문제가 또 걸림.
        2. pg_uuidv7 등 필요한 extension들이 아직 arm64용으로 빌드된 것이 없음
        3. pg_uuidv7의 경우 git repo를 받아 M시리즈 맥에서 빌드하여 사용할 수 있으나 이러면 amd64계열과 분리하여 관리해야하므로 유지보수가 어렵다고 판단.
    - extensions
      - postgis
      - uuid-ossp
      - pg_uuidv7(only amd64)(sequential uuid using timestamp)
        - 위에서 거론된 것과 같이 해당 git repo를 pull하여 애플 M시리즈 맥에서 빌드해서 arm64용 .so파일을 만들 수 있으나 유지보수성을 생각하여 당분간 amd64 버전을 사용