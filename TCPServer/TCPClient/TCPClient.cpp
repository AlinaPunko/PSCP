// TCPClient.cpp : Этот файл содержит функцию "main". Здесь начинается и заканчивается выполнение программы.
//

#include "pch.h"
#define _WINSOCK_DEPRECATED_NO_WARNINGS
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <tchar.h>
#include "Winsock2.h"                // заголовок  WS2_32.dll
#include <string>
#include <iostream>
#pragma comment(lib, "WS2_32.lib")   // экспорт  WS2_32.dll


using namespace std;

string  GetErrorMsgText(int code)    // cформировать текст ошибки 
{
	string msgText;
	switch (code)                      // проверка кода возврата  
	{
	case WSASYSNOTREADY:          msgText = "WSASYSNOTREADY";         break;
	case WSAVERNOTSUPPORTED:          msgText = "WSAVERNOTSUPPORTED";         break;
	case WSANOTINITIALISED:          msgText = "WSANOTINITIALISED";         break;
	case WSAEDISCON:          msgText = "WSAEDISCON";         break;
	case WSATYPE_NOT_FOUND:          msgText = "WSATYPE_NOT_FOUND";         break;
	case WSAHOST_NOT_FOUND:          msgText = "WSAHOST_NOT_FOUND";         break;
	case WSATRY_AGAIN:          msgText = "WSATRY_AGAIN";         break;
	case WSANO_RECOVERY:          msgText = "WSANO_RECOVERY";         break;
	case WSANO_DATA:          msgText = "WSANO_DATA";         break;
	case WSA_INVALID_HANDLE:          msgText = "WSA_INVALID_HANDLE";         break;
	case WSA_INVALID_PARAMETER:          msgText = "WSA_INVALID_PARAMETER";         break;
	case WSA_IO_INCOMPLETE:          msgText = "WSA_IO_INCOMPLETE";         break;
	case WSA_IO_PENDING:          msgText = "WSA_IO_PENDING";         break;
	case WSA_NOT_ENOUGH_MEMORY:          msgText = "WSA_NOT_ENOUGH_MEMORY";         break;
	case WSA_OPERATION_ABORTED:          msgText = "WSA_OPERATION_ABORTED";         break;
	case WSASYSCALLFAILURE:          msgText = "WSASYSCALLFAILURE";         break;
	case WSAEFAULT:          msgText = "WSAEFAULT";         break;
	case WSAEMFILE:          msgText = "WSAEMFILE";         break;
	case WSAEWOULDBLOCK:          msgText = "WSAEWOULDBLOCK";         break;
	case WSAEINPROGRESS:          msgText = "WSAEINPROGRESS";         break;
	case WSAEALREADY:          msgText = "WSAEALREADY";         break;
	case WSAENOTSOCK:          msgText = "WSAENOTSOCK";         break;
	case WSAEDESTADDRREQ:          msgText = "WSAEDESTADDRREQ";         break;
	case WSAEMSGSIZE:          msgText = "WSAEMSGSIZE";         break;
	case WSAEPROTOTYPE:          msgText = "WSAEPROTOTYPE";         break;
	case WSAEINTR:          msgText = "WSAEINTR";         break;
	case WSAENOPROTOOPT:          msgText = "WSAENOPROTOOPT";         break;
	case WSAEOPNOTSUPP:          msgText = "WSAEOPNOTSUPP";         break;
	case WSAESOCKTNOSUPPORT:          msgText = "WSAESOCKTNOSUPPORT";         break;
	case WSAEPROTONOSUPPORT:          msgText = "WSAEPROTONOSUPPORT";         break;
	case WSAEAFNOSUPPORT:          msgText = "WSAEAFNOSUPPORT";         break;
	case WSAEADDRINUSE:          msgText = "WSAEADDRINUSE";         break;
	case WSAEADDRNOTAVAIL:          msgText = "WSAEADDRNOTAVAIL";         break;
	case WSAECONNREFUSED:          msgText = "WSAECONNREFUSED";         break;
	case WSAETIMEDOUT:          msgText = "WSAETIMEDOUT";         break;
	case WSAESHUTDOWN:          msgText = "WSAESHUTDOWN";         break;
	case WSAENOBUFS:          msgText = "WSAENOBUFS";         break;
	case WSAECONNABORTED:          msgText = "WSAECONNABORTED";         break;
	case WSAENETDOWN:          msgText = "WSAENETDOWN";         break;
	case WSAENETUNREACH:          msgText = "WSAENETUNREACH";         break;
	case WSAENETRESET:          msgText = "WSAENETRESET";         break;
	case WSAECONNRESET:          msgText = "WSAECONNRESET";         break;
	case WSAENOTCONN:          msgText = "WSAENOTCONN";         break;
	case WSAEISCONN:          msgText = "WSAEISCONN";         break;
	case WSAEACCES:         msgText = "WSAEACCES";        break;
	case WSAEPROCLIM:         msgText = "WSAEPROCLIM";        break;
	case WSAEHOSTUNREACH:         msgText = "WSAEHOSTUNREACH";        break;
	default:                msgText = "***ERROR***";      break;
	};
	return msgText;
};

string  SetErrorMsgText(string msgText, int code)
{
	return  msgText + GetErrorMsgText(code);
};

int main()
{
	setlocale(LC_ALL, "Russian");
	WSADATA wsaData;
	try
	{
		if (WSAStartup(MAKEWORD(2, 0), &wsaData) != 0)// Инициализация библиотеки
			throw  SetErrorMsgText("Startup:", WSAGetLastError());
		SOCKET  cC;                          // серверный сокет
		if ((cC = socket(AF_INET, SOCK_STREAM, NULL)) == INVALID_SOCKET)
			throw  SetErrorMsgText("socket:", WSAGetLastError());

		SOCKADDR_IN serv;                    // параметры  сокета сервера
		serv.sin_family = AF_INET;           // используется IP-адресация  
		serv.sin_port = htons(40000);                   // TCP-порт 2000
		serv.sin_addr.s_addr = inet_addr("127.0.0.1");  // адрес сервера
		if ((connect(cC, (sockaddr*)&serv, sizeof(serv))) == SOCKET_ERROR)
			throw  SetErrorMsgText("connect:", WSAGetLastError());
			char ibuf[50] = "Hello", obuf[10];
			int libuf = 0,lobuf = 0;
			if ((libuf = send(cC, ibuf, strlen(ibuf) + 1, NULL)) == SOCKET_ERROR)
				throw  SetErrorMsgText("send:", WSAGetLastError());
			if ((lobuf = recv(cC, obuf, strlen(obuf) + 1, NULL)) == SOCKET_ERROR)
				throw  SetErrorMsgText("recv:", WSAGetLastError());
			else cout << obuf << endl;
		if (closesocket(cC) == SOCKET_ERROR) // Закрытие сокета
			throw  SetErrorMsgText("closesocket:", WSAGetLastError());
		if (WSACleanup() == SOCKET_ERROR) // Завершение работы с библиотекой
			throw  SetErrorMsgText("Cleanup:", WSAGetLastError());
	}
	catch (string errorMsgText)
	{
		cout << errorMsgText << endl;
	}
	return 0;
}
