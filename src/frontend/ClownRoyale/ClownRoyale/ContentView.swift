//
//  ContentView.swift
//  ClownRoyale
//
//  Created by Jan Donnerbauer on 10.03.21.
//

import SwiftUI

struct ContentView: View {
    var body: some View {
        NavigationView {
           RankingUIView()
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}