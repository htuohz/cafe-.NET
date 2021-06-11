#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /src
COPY cafeNew.csproj ./
RUN dotnet restore "./cafeNew.csproj"
COPY . .
WORKDIR "/src/."
RUN apt-get update && apt-get upgrade -y && \
    apt-get install -y nodejs \
    npm   
RUN npm install -g npm
COPY ClientApp/package.json ./
RUN npm install --legacy-peer-deps
RUN dotnet build "cafeNew.csproj" -c Release -o /app/build




FROM build AS publish
RUN dotnet publish "cafeNew.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "cafeNew.dll"]
