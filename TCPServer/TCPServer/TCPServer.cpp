// TCPServer.cpp : Этот файл содержит функцию "main". Здесь начинается и заканчивается выполнение программы.
//

#include "pch.h"
#include <iostream>
#define _WINSOCK_DEPRECATED_NO_WARNINGS
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <tchar.h>
#include "Winsock2.h"                // заголовок  WS2_32.dll
#include <string>
#include <ctime>
#pragma comment(lib, "WS2_32.lib")   // экспорт  WS2_32.dll




using namespace std;

string  GetErrorMsgText(int code)    // cформировать текст ошибки 
{
	string msgText;
	switch (code)                      // проверка кода возврата  
	{
	case WSAEINTR:				msgText = "WSAEINTR: Работа функции прервана.\n";								break;
	case WSAEACCES:				msgText = "WSAEACCES: Разрешение отвергнуто.\n";								break;
	case WSAEFAULT:				msgText = "WSAEFAULT: Ошибочный адрес.\n";										break;
	case WSAEINVAL:				msgText = "WSAEINVAL: Ошибка в аргументе.\n";									break;
	case WSAEMFILE:				msgText = "WSAEMFILE: Слишком много файлов открыто.\n";							break;
	case WSAEWOULDBLOCK:		msgText = "WSAEWOULDBLOCK: Ресурс временно недоступен.\n";						break;
	case WSAEINPROGRESS:		msgText = "WSAEINPROGRESS: Операция в процессе развития.\n";					break;
	case WSAEALREADY:			msgText = "WSAEALREADY: Операция уже выполняется .\n";							break;
	case WSAENOTSOCK:			msgText = "WSAENOTSOCK: Сокет задан неправильно.\n";							break;
	case WSAEDESTADDRREQ:		msgText = "WSAEDESTADDRREQ: Требуется адрес расположения.\n";					break;
	case WSAEMSGSIZE:			msgText = "WSAEMSGSIZE: Сообщение слишком длинное .\n";							break;
	case WSAEPROTOTYPE:			msgText = "WSAEPROTOTYPE: Неправильный тип протокола для сокета.\n";			break;
	case WSAENOPROTOOPT:		msgText = "WSAENOPROTOOPT: Ошибка в опции протокола.\n";						break;
	case WSAEPROTONOSUPPORT:	msgText = "WSAEPROTONOSUPPORT: Протокол не поддерживается.\n";					break;
	case WSAESOCKTNOSUPPORT:	msgText = "WSAESOCKTNOSUPPORT: Тип сокета не поддерживается.\n";				break;
	case WSAEOPNOTSUPP:			msgText = "WSAEOPNOTSUPP: Операция не поддерживается.\n";						break;
	case WSAEPFNOSUPPORT:		msgText = "WSAEPFNOSUPPORT: Тип протоколов не поддерживается.\n";				break;
	case WSAEAFNOSUPPORT:		msgText = "WSAEAFNOSUPPORT: Тип адресов не поддерживается протоколом.\n";		break;
	case WSAEADDRINUSE:			msgText = "WSAEADDRINUSE: Адрес уже используется .\n";							break;
	case WSAEADDRNOTAVAIL:		msgText = "WSAEADDRNOTAVAIL: Запрошенный адрес не может быть использован.\n";	break;
	case WSAENETDOWN:			msgText = "WSAENETDOWN: Сеть отключена .\n";									break;
	case WSAENETUNREACH:		msgText = "WSAENETUNREACH: Сеть не достижима.\n";								break;
	case WSAENETRESET:			msgText = "WSAENETRESET: Сеть разорвала соединение.\n";							break;
	case WSAECONNABORTED:		msgText = "WSAECONNABORTED: Программный отказ связи.\n";						break;
	case WSAECONNRESET:			msgText = "WSAECONNRESET: Связь восстановлена.\n";								break;
	case WSAENOBUFS:			msgText = "WSAENOBUFS: Не хватает памяти для буферов.\n";						break;
	case WSAEISCONN:			msgText = "WSAEISCONN: Сокет уже подключен.\n";									break;
	case WSAENOTCONN:			msgText = "WSAENOTCONN: Сокет не подключен.\n";									break;
	case WSAESHUTDOWN:			msgText = "WSAESHUTDOWN: Нельзя выполнить send: сокет завершил работу.\n";		break;
	case WSAETIMEDOUT:			msgText = "WSAETIMEDOUT: Закончился отведенный интервал  времени.\n";			break;
	case WSAECONNREFUSED:		msgText = "WSAECONNREFUSED: Соединение отклонено.\n";							break;
	case WSAEHOSTDOWN:			msgText = "WSAEHOSTDOWN: Хост в неработоспособном состоянии.\n";				break;
	case WSAEHOSTUNREACH:		msgText = "WSAEHOSTUNREACH: Нет маршрута для хоста.\n";							break;
	case WSAEPROCLIM:			msgText = "WSAEPROCLIM: Слишком много процессов.\n";							break;
	case WSASYSNOTREADY:		msgText = "WSASYSNOTREADY: Сеть не доступна.\n";								break;
	case WSAVERNOTSUPPORTED:	msgText = "WSAVERNOTSUPPORTED: Данная версия недоступна.\n";					break;
	case WSANOTINITIALISED:		msgText = "WSANOTINITIALISED: Не выполнена инициализация WS2_32.DLL.\n";		break;
	case WSAEDISCON:			msgText = "WSAEDISCON: Выполняется отключение.\n";								break;
	case WSATYPE_NOT_FOUND:		msgText = "WSATYPE_NOT_FOUND: Класс не найден.\n";								break;
	case WSAHOST_NOT_FOUND:		msgText = "WSAHOST_NOT_FOUND: Хост не найден.\n";								break;
	case WSATRY_AGAIN:			msgText = "WSATRY_AGAIN: Неавторизированный хост не найден.\n";					break;
	case WSANO_RECOVERY:		msgText = "WSANO_RECOVERY: Неопределенная  ошибка.\n";							break;
	case WSANO_DATA:			msgText = "WSANO_DATA: Нет записи запрошенного типа.\n";						break;
	case WSA_INVALID_HANDLE:	msgText = "WSA_INVALID_HANDLE: Указанный дескриптор события  с ошибкой.\n";		break;
	case WSA_INVALID_PARAMETER: msgText = "WSA_INVALID_PARAMETER: Один или более параметров с ошибкой.\n";		break;
	case WSA_IO_INCOMPLETE:		msgText = "WSA_IO_INCOMPLETE: Объект ввода-вывода не в сигнальном состоянии.\n"; break;
	case WSA_IO_PENDING:		msgText = "WSA_IO_PENDING: Операция завершится позже.\n";						break;
	case WSA_NOT_ENOUGH_MEMORY: msgText = "WSA_NOT_ENOUGH_MEMORY: Не достаточно памяти.\n";						break;
	case WSA_OPERATION_ABORTED: msgText = "WSA_OPERATION_ABORTED: Операция отвергнута.\n";						break;
	case WSASYSCALLFAILURE:		msgText = "WSASYSCALLFAILURE: Аварийное завершение системного вызова.\n";		break;
	default:					msgText = "***********************ERROR***********************\n";				break;
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
	cout << "Server" << endl;
	WSADATA wsaData;
	SOCKET sS;
	clock_t t1, t2;
	if (WSAStartup(MAKEWORD(2, 0), &wsaData) != 0)// Инициализация библиотеки
		throw  SetErrorMsgText("Startup:", WSAGetLastError());
	if ((sS = socket(AF_INET, SOCK_STREAM, NULL)) == INVALID_SOCKET) // Открытие сокета
		throw  SetErrorMsgText("socket:", WSAGetLastError());
	SOCKADDR_IN serv;                     // параметры  сокета sS
	serv.sin_family = AF_INET;           // используется IP-адресация  
	serv.sin_port = htons(40000);          // порт 2000
	serv.sin_addr.s_addr = INADDR_ANY;   // любой собственный IP-адрес 
	if (bind(sS, (LPSOCKADDR)&serv, sizeof(serv)) == SOCKET_ERROR) // Установка параметров сокета
		throw  SetErrorMsgText("bind:", WSAGetLastError());
	if (listen(sS, SOMAXCONN) == SOCKET_ERROR)
		throw  SetErrorMsgText("listen:", WSAGetLastError());
	while (true)
	{
		try
		{

			SOCKET cS;	                 // сокет для обмена данными с клиентом 
			SOCKADDR_IN clnt;             // параметры  сокета клиента
			memset(&clnt, 0, sizeof(clnt)); // обнулить память
			int lclnt = sizeof(clnt);    // размер SOCKADDR_IN
			if ((cS = accept(sS, (sockaddr*)&clnt, &lclnt)) == INVALID_SOCKET)
				throw  SetErrorMsgText("accept:", WSAGetLastError());
			cout << "Port:" << clnt.sin_port << endl;
			cout << "IPv4:" << inet_ntoa(clnt.sin_addr) << endl;
			char ibuf[50]="",                     //буфер ввода 
				obuf[50] = "";  //буфер вывода
			int  libuf = 0,                    //количество принятых байт
				lobuf = 0;                    //количество отправленных байт
				if ((lobuf = recv(cS, obuf, sizeof(obuf), NULL)) == SOCKET_ERROR)
					throw  SetErrorMsgText("recv:", WSAGetLastError());
				cout << obuf << endl;
				char buf[] = "Echo";
				strcat(buf, obuf);
				if ((libuf = send(cS, buf, strlen(buf) + 1, NULL)) == SOCKET_ERROR)
					throw  SetErrorMsgText("send:", WSAGetLastError());
			if (closesocket(cS) == SOCKET_ERROR) // Закрытие сокета
				throw  SetErrorMsgText("closesocket:", WSAGetLastError());
		}
		catch (string errorMsgText)
		{
			cout << errorMsgText << endl;
		}
	}
	if (closesocket(sS) == SOCKET_ERROR) // Закрытие сокета
		throw  SetErrorMsgText("closesocket:", WSAGetLastError());
	if (WSACleanup() == SOCKET_ERROR) // Завершение работы с библиотекой
		throw  SetErrorMsgText("Cleanup:", WSAGetLastError());
	return 0;
}
// Запуск программы: CTRL+F5 или меню "Отладка" > "Запуск без отладки"
// Отладка программы: F5 или меню "Отладка" > "Запустить отладку"

// Советы по началу работы 
//   1. В окне обозревателя решений можно добавлять файлы и управлять ими.
//   2. В окне Team Explorer можно подключиться к системе управления версиями.
//   3. В окне "Выходные данные" можно просматривать выходные данные сборки и другие сообщения.
//   4. В окне "Список ошибок" можно просматривать ошибки.
//   5. Последовательно выберите пункты меню "Проект" > "Добавить новый элемент", чтобы создать файлы кода, или "Проект" > "Добавить существующий элемент", чтобы добавить в проект существующие файлы кода.
//   6. Чтобы снова открыть этот проект позже, выберите пункты меню "Файл" > "Открыть" > "Проект" и выберите SLN-файл.
